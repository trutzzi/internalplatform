import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFireStore } from '../../hooks/useFirestore';
import { TableDefinition } from './tableDefinition';
import TableData from './tableData';
import { GridCellParams } from '@mui/x-data-grid';

function MyTasks() {
  const { getCollectionsBy } = useFireStore('tasks');
  const [data, setData] = useState<null | TableDefinition[]>(null);
  const { user, authIsReady } = useAuthContext();
  const { updateDocument } = useFireStore('tasks');

  async function updatetaskSelected(params: GridCellParams) {
    console.log(params);
    if (params.field === 'done') {
      const formData = {
        done: !params.value
      };
      await updateDocument(params.id.toString(), formData);
    }
  }

  useEffect(() => {
    (async () => {
      if (authIsReady) {
        if (user) {
          const collectionRequest = await getCollectionsBy('assigned', user.uid);
          setData(collectionRequest as TableDefinition[]);
        }
      }
    })();
  }, [authIsReady, user]);

  return (
    <Container>
      <Grid>
        <Typography
          variant="h3"
          style={{ textTransform: 'capitalize' }}
          component="div"
          gutterBottom
        >
          My tasks
        </Typography>
        <Grid item>
          {data ? (
            <TableData currentlySelected={updatetaskSelected} data={data} />
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
export default MyTasks;
