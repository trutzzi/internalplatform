import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFireStore } from "../../hooks/useFirestore";
import TableData from './tableData'
import { TableDefinition } from "./tableDefinition";

type UserResponse = {
  displayName: string,
  email: string,
  uid: string
}

const Employee = () => {
  const { getCollectionsBy } = useFireStore('users')
  const [users, setUsers] = useState<null | TableDefinition[]>(null);
  const { user, authIsReady } = useAuthContext();

  useEffect(() => {
    (async () => {
      if (authIsReady) {
        if (user) {
          const collectionRequest = await getCollectionsBy('supervisorId', user.uid)
            .then((results: UserResponse[]) => {
              // add uid as id for table data required field
              return results.map((item: UserResponse) => ({ ...item, id: item.uid }));
            })
          setUsers(collectionRequest)
        }
      }
    })();

  }, []);

  return (
    <Container>
      <Grid>
        <Typography variant="h3" style={{ textTransform: 'capitalize' }} component="div" gutterBottom>{user?.displayName}'s Employees</Typography>
        <Grid item>
          {users ? <TableData data={users} /> : <CircularProgress />}
        </Grid>
      </Grid>
    </Container>
  )
}
export default Employee;