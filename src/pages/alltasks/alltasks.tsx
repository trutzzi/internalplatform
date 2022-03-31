import { Checkbox, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFireStore, UserWithProps } from '../../hooks/useFirestore';
import TableData from './tableData';
import DrawerTask from './drawer';
import { GridCellParams } from '@mui/x-data-grid';

function AllTasks() {
  const { getCollectionsBy: allMyEmployeeTasks } = useFireStore('tasks');
  const { getCollectionsBy } = useFireStore('users');
  const [data, setData] = useState<any[] | null>(null);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const { user, authIsReady } = useAuthContext();
  const [bulkEdit, setBulkEdit] = useState(false);

  async function updatetaskSelected(params: GridCellParams) {
    console.log(params);
    if (params.field === 'action') {
      setSelectedTask(params.id);
    }
  }

  const fetchData = async () => {
    console.log('Fetching data...');

    if (authIsReady) {
      const requestNames: Promise<any>[] = [];
      if (user) {
        //TODO: Callback create infinite refresh
        const collectionRequest = await allMyEmployeeTasks('uid', user.uid).then((results) => {
          // add uid as id for table data required field
          return results.map((item) => {
            requestNames.push(getCollectionsBy('uid', item.assigned));
            return item;
          });
        });
        const allNameRequested = await Promise.all(requestNames).then((value) => value);
        const wrappedRequests = allNameRequested.reduce((a, b) => [...a, ...b], []);
        const getName = (uid: string) =>
          wrappedRequests.filter((userFiltered: UserWithProps) => userFiltered.uid === uid);
        const processedData = collectionRequest.map((userRequest) => ({
          ...userRequest,
          user: getName(userRequest.assigned)
        }));
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
        <Typography
          variant="h3"
          style={{ textTransform: 'capitalize' }}
          component="div"
          gutterBottom
        >
          All employee&apos;s Tasks
        </Typography>
        <Checkbox name="done" onChange={(e) => setBulkEdit(e.target.checked)} checked={bulkEdit} />
        <span>Multiple edit</span>
        <Grid item>
          {data ? (
            <TableData
              currentlySelected={updatetaskSelected}
              onSelect={setSelectedTask}
              isBulkEdit={bulkEdit}
              data={data}
            />
          ) : (
            <CircularProgress />
          )}
          <DrawerTask close={setSelectedTask} uid={selectedTask} />
        </Grid>
      </Grid>
    </Container>
  );
}
export default AllTasks;
