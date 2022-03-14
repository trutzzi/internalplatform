import React, { FC, useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/system';
import { doc, DocumentData, getDoc } from '@firebase/firestore';
import { projectDb } from '../../firebase/config';
import { Button, Checkbox, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import { useAuthContext } from '../../hooks/useAuthContext';
import DropdownAsync from '../../components/dropdownAsync';
import { useFireStore } from '../../hooks/useFirestore';

type DrawerProps = {
  uid: string | null,
  close: React.Dispatch<React.SetStateAction<string | null>>,
};
type Task = {
  title: string, description: string, assigned: string, done: boolean, deadline: string
};


const DrawerTask: FC<DrawerProps> = ({ uid, close }) => {
  const { user } = useAuthContext();
  const { getCollectionsBy } = useFireStore('users');
  const { updateDocument } = useFireStore('tasks');
  const [isLoading, setIsloading] = useState(true);
  const [data, setData] = useState<null | DocumentData>(null);
  const [assignedDropdown, setAssignedDropdown] = useState<{ label: string, value: string | number }[] | null>(null);
  const [formData, setFormData] = useState<DocumentData | null>(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setFormData(null);
    setData(null);
    (async () => {
      if (uid) {
        setIsloading(true);
        const docRef = doc(projectDb, 'tasks', uid);
        const docSnap = await getDoc(docRef);
        const results = docSnap.data();
        if (user) {
          const optionsUsers = await getCollectionsBy('supervisorId', user.uid);
          const options = optionsUsers.map((option) => ({ label: option.displayName, value: option.uid }));
          setAssignedDropdown(options);
        }
        if (results) {
          setIsloading(false);
          setData(results);
          setFormData(results);
        }
      }
    })();
  }, [uid, user]);

  useEffect(() => {
    if (formData && data) {
      setIsChanged(formData.title !== data.title || formData.description !== data.description || formData.assigned !== data.assigned || formData.done !== data.done || formData.deadline !== data.deadline);
    }
  }, [formData, data]);

  const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const update = async () => {
    //Update document
    if (uid) {
      await updateDocument(uid, formData);
      setIsloading(true);
      close(null);
    }
  };

  return (
    <Drawer
      open={!!uid}
      anchor="right"
      onClose={() => close(null)}
    >
      <Box style={{ width: 400 }}>
        <Grid container padding={2} direction={'column'} spacing={3}>
          {formData && !isLoading ? (
            <>
              <Grid item>
                <Grid container justifyContent={'space-between'} >
                  <Grid item >
                    <Typography variant='h5'>Task edit</Typography>
                  </Grid>
                  <Grid item >
                    <Button onClick={() => close(null)}><GridCloseIcon /></Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <TextField name='title' onChange={(handleFormChange)} required label="Title" defaultValue={formData?.title} />
              </Grid>
              <Grid item>
                <TextField name='description' onChange={handleFormChange} required label="Description" defaultValue={formData?.description} />
              </Grid>
              <Grid item>
                {assignedDropdown ? <DropdownAsync name='assigned' defaultValue={formData?.assigned} label="Employee assigned" handleChange={handleFormChange} items={assignedDropdown} /> : <CircularProgress />}
              </Grid>
              <Grid item>
                <Checkbox name='done' onChange={e => setFormData({ ...formData, done: e.target.checked })} checked={formData?.done} /><span>Mark as done</span>
              </Grid>
              <Grid item>
                <TextField
                  name='deadline'
                  label="Deadline"
                  type="datetime-local"
                  defaultValue={formData?.deadline}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item>
                <Button variant='contained' onClick={update} disabled={!isChanged && isLoading} >Update task</Button>
              </Grid>
            </>
          ) : <Grid item><CircularProgress /></Grid>
          }
        </Grid>
      </Box >
    </Drawer >
  );
};
export default DrawerTask;