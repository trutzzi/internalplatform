import { DocumentData } from '@firebase/firestore';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFireStore } from '../../hooks/useFirestore';
import TableData from './tableData';

function Employee() {
  const { getCollectionsBy } = useFireStore('users');
  const [users, setUsers] = useState<null | any[]>(null);
  const { user, authIsReady } = useAuthContext();

  useEffect(() => {
    (async () => {
      if (authIsReady) {
        if (user) {
          const collectionRequest = await getCollectionsBy('supervisorId', user.uid).then(
            (results: DocumentData[]) =>
              // add uid as id for table data required field
              results.map((item: DocumentData) => ({ ...item, id: item.uid }))
          );
          setUsers(collectionRequest);
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
          {user?.displayName}
          &apos;s Employee
        </Typography>
        <Grid item>{users ? <TableData data={users} /> : <CircularProgress />}</Grid>
      </Grid>
    </Container>
  );
}
export default Employee;
