import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFireStore } from "../../hooks/useFirestore";
import { TableDefinition } from "./tableDefinition";
import TableData from './tableData'

const AllTasks = () => {
  const { getCollectionsBy: allMyEmployeeTasks } = useFireStore('tasks')
  const { getCollectionsBy } = useFireStore('users')
  const [data, setData] = useState<null | TableDefinition[]>(null);
  const { user, authIsReady } = useAuthContext();

  useEffect(() => {
    /**
     * Autoinvoke function for get employeeName for each Uid
     * this is the only way to get name from another collection 
     */
    (async () => {
      if (authIsReady) {
        const requestNames: any = [];
        if (user) {
          const collectionRequest = await allMyEmployeeTasks('uid', user.uid)
            .then((results: TableDefinition[]) => {
              // add uid as id for table data required field
              return results.map((item: TableDefinition, index) => {
                requestNames.push(getCollectionsBy('uid', item.assigned));
                return { ...item, id: index }
              });
            })
          const allNameRequested = await Promise.all(requestNames).then(value => value);
          const wrappedRequests = ([].concat.apply([], allNameRequested));
          const getName = (uid: string) => wrappedRequests.filter((user: any) => user.uid === uid)
          const attachNames = collectionRequest.map((user: any) => ({ ...user, user: getName(user.assigned) }))
          setData(attachNames)
        }
      }
    })();
  }, []);

  return (
    <Container>
      <Grid>
        <Typography variant="h3" style={{ textTransform: 'capitalize' }} component="div" gutterBottom>All employee's Tasks</Typography>
        <Grid item>
          {data ? <TableData data={data} /> : <CircularProgress />}
        </Grid>
      </Grid>
    </Container>
  )
}
export default AllTasks;