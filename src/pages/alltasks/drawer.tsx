import React, { FC, useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/system';
import { doc, DocumentData, getDoc } from '@firebase/firestore';
import { projectDb } from '../../firebase/config';
import { Button, CircularProgress } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';

type DrawerProps = {
  uid: string | null,
  close: React.Dispatch<React.SetStateAction<string | null>>,
};



const DrawerTask: FC<DrawerProps> = ({ uid, close }) => {
  const [data, setData] = useState<DocumentData | null | undefined>(null);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    (async () => {
      if (uid) {
        setIsloading(true);
        const docRef = doc(projectDb, 'tasks', uid);
        const docSnap = await getDoc(docRef);
        const results = docSnap.data();
        if (results) {
          setData(results);
          setIsloading(false);
        }
      }
    })();
  }, [uid]);

  return (
    <Drawer
      open={!!uid}
      anchor="right"
      onClose={() => close(null)}
    >
      <Box style={{ width: 400 }}>
        <Button onClick={() => close(null)}><GridCloseIcon /></Button>
        {data && !isLoading ? data?.title : <CircularProgress />}
      </Box>
    </Drawer>
  );
};
export default DrawerTask;