import {
  CircularProgress, Container, Grid, Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFireStore } from '../../hooks/useFirestore';
import { TableDefinition } from './tableDefinition';
import TableData from './tableData';

function MyTasks() {
  const { getCollectionsBy } = useFireStore('tasks');
  const [users, setUsers] = useState<null | TableDefinition[]>(null);
  const { user, authIsReady } = useAuthContext();

  useEffect(() => {
    (async () => {
      if (authIsReady) {
        if (user) {
          const collectionRequest = await getCollectionsBy('assigned', user.uid)
            .then((results: TableDefinition[]) =>
              // add uid as id for table data required field
              results.map((item: TableDefinition, index) => ({ ...item, id: index })));
          setUsers(collectionRequest);
        }
      }
    })();
  }, [authIsReady, getCollectionsBy, user]);

  return (
    <Container>
      <Grid>
        <Typography variant="h3" style={{ textTransform: 'capitalize' }} component="div" gutterBottom>My tasks</Typography>
        <Grid item>
          {users ? <TableData data={users} /> : <CircularProgress />}
        </Grid>
      </Grid>
    </Container>
  );
}
export default MyTasks;
