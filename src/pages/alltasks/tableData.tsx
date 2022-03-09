import { FC, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid } from '@mui/material';
import { columnsDefinition, TableDefinition } from './tableDefinition';
import { useFireStore } from '../../hooks/useFirestore';

type TableDataProps = {
  data: TableDefinition[];
};
const TableData: FC<TableDataProps> = ({ data }) => {
  const { deleteDocument } = useFireStore('tasks');
  const [selected, setSelected] = useState([]);

  const handleChange = (state: any) => {
    /**
     * Define a function to handle the update/delete by checkbox
     */
    setSelected(state);
    console.log(data);
    console.log(state);
  };

  const deleteTasks = async () => {
    selected.map((task) => deleteDocument(task));
  };

  const renderSelectRow = () => (
    <Grid item style={{ marginTop: '25px', marginBottom: '25px' }}>
      <Button onClick={deleteTasks} variant="contained">Delete</Button>
      <Button onClick={() => alert('This Feature will be developed.')} color="secondary" variant="contained" style={{ marginLeft: '15px' }}>Mark as completed</Button>
    </Grid>

  );


  return (
    <Grid container direction="column" spacing="10px">
      <Grid item>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columnsDefinition}
            pageSize={25}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={handleChange}
          />
        </div>
      </Grid>
      {selected.length ? renderSelectRow() : <p>Select a row to edit.</p>}
    </Grid>
  );
};
export default TableData;
