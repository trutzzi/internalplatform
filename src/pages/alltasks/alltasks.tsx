import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFireStore, User } from "../../hooks/useFirestore";
import { TableDefinition } from "./tableDefinition";
import TableData from './tableData'

const AllTasks = () => {
  const { getCollectionsBy: allMyEmployeeTasks } = useFireStore('tasks')
  const { getCollectionsBy } = useFireStore('users')
  const [users, setUsers] = useState<null | TableDefinition[]>(null);
  const { user, authIsReady } = useAuthContext();
  const [userNames, setUserNames] = useState([]);

  useEffect(() => {
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
          const userRequested = await Promise.all(requestNames).then(value => value);
          const superReqAll = ([].concat.apply([], userRequested));
          const getName = (uid: string) => superReqAll.filter((user: any) => user.uid == uid)
          const newName = collectionRequest.map((user: any) => ({ ...user, user: getName(user.assigned) }))
          setUsers(newName)
        }
      }
    })();
  }, []);

  return (
    <Container>
      <Grid>
        <Typography variant="h3" style={{ textTransform: 'capitalize' }} component="div" gutterBottom>All employee Tasks</Typography>
        <Grid item>
          {users ? <TableData data={users} /> : <CircularProgress />}
        </Grid>
      </Grid>
    </Container>
  )
}
export default AllTasks;