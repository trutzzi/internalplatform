import {
  CircularProgress, Container, Grid, Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFireStore, UserWithProps } from '../../hooks/useFirestore';
import { TableDefinition } from './tableDefinition';
import TableData from './tableData';
import DrawerTask from './drawer';

function AllTasks() {
  const { getCollectionsBy: allMyEmployeeTasks } = useFireStore('tasks');
  const { getCollectionsBy } = useFireStore('users');
  const [data, setData] = useState<null | TableDefinition[]>(null);
  const [selectedTask, setSelectedTask] = useState<null | string>(null);
  const { user, authIsReady } = useAuthContext();

  const fetchData = async () => {
    console.log('Fetching data...');

    if (authIsReady) {
      const requestNames: Promise<any>[] = [];
      if (user) {
        //TOFIX: Callback create infinite refresh 
        // const collectionRequest = await allMyEmployeeTasks('uid', user.uid,fetchData)
        const collectionRequest = await allMyEmployeeTasks('uid', user.uid)
          .then((results: TableDefinition[]) => {
            // add uid as id for table data required field
            return results.map((item: TableDefinition) => {
              requestNames.push(getCollectionsBy('uid', item.assigned));
              return item;
            });
          });
        const allNameRequested = await Promise.all(requestNames).then(value => value);
        const wrappedRequests2 = allNameRequested.reduce((a, b) => [...a, ...b], []);
        const getName = (uid: string) => wrappedRequests2.filter((userFiltered: UserWithProps) => userFiltered.uid === uid);
        const processedData = collectionRequest.map((userRequest) => ({ ...userRequest, user: getName(userRequest.assigned) }));
        setData(processedData);
      }
    }
  };

  useEffect(() => {
    /**
     * Autoinvoke function for get employeeName for each Uid
     * this is the only way to get name from another collection
     */
    fetchData();
  }, []);

  return (
    <Container>
      <Grid>
        <Typography variant="h3" style={{ textTransform: 'capitalize' }} component="div" gutterBottom>All employee&apos;s Tasks</Typography>
        <Grid item>
          {data ? <TableData onSelect={setSelectedTask} data={data} /> : <CircularProgress />}
          <DrawerTask close={setSelectedTask} uid={selectedTask} />
        </Grid>
      </Grid>
    </Container>
  );
}
export default AllTasks;
