import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import {
  Button, Grid, TextField, Typography, TextareaAutosize, Container, CircularProgress,
} from '@mui/material';
import { useFireStore } from '../hooks/useFirestore';
import { useAuthContext } from '../hooks/useAuthContext';
import DropdownAsync from '../components/dropdownAsync';

export default function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assigned, setAssigned] = useState('');
  const [assignedDropdown, setAssignedDropdown] = useState<{ label: string, value: string | number }[] | null>(null);

  const { addDocument, response } = useFireStore('tasks');
  const { getCollectionsBy } = useFireStore('users');

  const { user } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      addDocument({
        uid: user.uid,
        title,
        description,
        deadline,
        done: false,
        assigned,
        createdAt: new Date().toISOString(),
        doneAt: null,
      });
    }
  };

  useEffect(() => {
    (
      async () => {
        if (user) {
          const optionsUsers = await getCollectionsBy('supervisorId', user.uid);
          const options = optionsUsers.map((option) => ({ label: option.displayName, value: option.uid }));
          setAssignedDropdown(options);
        }
      }
    )();

    if (response.success) {
      setTitle('');
      setDescription('');
      setDeadline('');
    }
  }, []);

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h3" component="div" gutterBottom> Add new task</Typography>

        <Grid container direction="column" rowSpacing={2}>
          <Grid item>
            <TextField
              placeholder="Title"
              label="Title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </Grid>

          <Grid item>
            <Grid item>
              {assignedDropdown ? <DropdownAsync label="Employee assigned" defaultValue={assigned} handleChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setAssigned(e.target.value)} items={assignedDropdown} /> : <CircularProgress />}
            </Grid>
          </Grid>
          <Grid item>
            <TextareaAutosize
              style={{
                width: 230,
                borderRadius: 3,
                borderColor: '#999',
                borderWidth: 1,
                height: 80,
                padding: 15,
              }}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              maxLength={190}
              minRows={1}
              required
            />
            <div>
              {description && (`${description.length}/ 190 chars description`)}
            </div>
          </Grid>
          <Grid item>
            <TextField
              label="Deadline"
              style={{ width: '260px' }}
              type="datetime-local"
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">New task</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
