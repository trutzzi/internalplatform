import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useFireStore } from "../hooks/useFirestore";
import { useAuthContext } from "../hooks/useAuthContext";
import { Box } from "@mui/system";
import { Button, Grid, TextField, Typography, TextareaAutosize, Container, CircularProgress } from "@mui/material";
import DropdownAsync from "../components/DropdownAsync";

export default function Create({ }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assigned, setAssigned] = useState("");
  const [assignedDropdown, setAssignedDropdown] = useState<{ label: string, value: string | number }[] | null>(null);

  const { addDocument, response } = useFireStore("tasks");
  const { getCollectionsBy } = useFireStore('users');
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    user && addDocument({
      uid: user.uid,
      title,
      description,
      deadline,
      assigned
    });
    navigate("/");
  };

  useEffect(() => {
    (
      async () => {
        if (user) {
          const optionsUsers = await getCollectionsBy('supervisorId', user.uid);
          const options = optionsUsers.map((user) => {
            return { label: user.displayName, value: user.uid }
          })
          setAssignedDropdown(options)
        }
      }
    )()

    if (response.success) {
      setTitle("");
      setDescription("");
      setDeadline("");
    }
  }, [response.success]);

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h3" component="div" gutterBottom> Add task</Typography>

        <Grid container direction={"column"} rowSpacing={2}>
          <Grid item >
            <TextField
              placeholder="Title"
              label="Title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </Grid>

          <Grid item >
            <Grid item >
              {assignedDropdown ? <DropdownAsync label="Employee assigned" handleChange={setAssigned} items={assignedDropdown} /> : <CircularProgress />}
            </Grid>
          </Grid>
          <Grid item >
            <TextareaAutosize
              style={{
                width: 190,
                borderRadius: 3,
                borderColor: '#999',
                borderWidth: 1,
                height: 80,
                padding: 15
              }}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              maxLength={190}
              minRows={1}
              required
            />
            <span style={{ display: 'block' }}>
              {description && (description.length + '/ 190 chars description')}
            </span>
          </Grid>
          <Grid item>
            <TextField
              label="Deadline"
              type="datetime-local"
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">New</Button>
          </Grid>
        </Grid>
      </Box>
    </Container >
  );
}