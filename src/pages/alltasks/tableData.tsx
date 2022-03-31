import { FC, useState } from 'react';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { Button, Grid, Typography } from '@mui/material';
import { columnsDefinition, TableDefinition } from './tableDefinition';
import { useFireStore } from '../../hooks/useFirestore';

type TableDataProps = {
  data: TableDefinition[];
  onSelect: React.Dispatch<React.SetStateAction<string | null>>;
  currentlySelected: any;
  isBulkEdit: boolean;
};
const TableData: FC<TableDataProps> = ({ data, onSelect, currentlySelected, isBulkEdit }) => {
  const { deleteDocument } = useFireStore('tasks');
  const [selected, setSelected] = useState<any>([]);

  const handleChange = (selectionModel: GridSelectionModel) => {
    setSelected(selectionModel);
  };

  const deleteTasks = async () => {
    selected.map((task: string) => deleteDocument(task));
  };
  const handleEditMode = () => {
    if (selected.length === 1) {
      onSelect(selected[0]);
    }
  };

  const renderSelectRow = () => (
    <Grid item style={{ marginTop: '25px', marginBottom: '25px' }}>
      <Button onClick={deleteTasks} variant="contained">
        Delete
      </Button>
    </Grid>
  );

  return (
    <Grid container direction="column" spacing="10px">
      <Grid item>
        <div style={{ width: '100%' }}>
          <DataGrid
            rows={data}
            columns={columnsDefinition}
            pageSize={25}
            autoHeight
            rowsPerPageOptions={[5]}
            checkboxSelection={isBulkEdit}
            onCellClick={currentlySelected}
            onSelectionModelChange={handleChange}
          />
        </div>
      </Grid>
      {selected.length ? (
        renderSelectRow()
      ) : (
        <Typography style={{ padding: '10px' }} variant="overline" display="block" gutterBottom>
          Select a row to edit or multiple to delete.
        </Typography>
      )}
    </Grid>
  );
};
export default TableData;
