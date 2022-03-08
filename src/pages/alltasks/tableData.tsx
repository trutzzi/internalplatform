import { FC, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columnsDefinition, TableDefinition } from './tableDefinition';

type TableDataProps = {
  data: TableDefinition[];
};
const TableData: FC<TableDataProps> = ({ data }) => {
  const handleChange = (state: any) => {
    /**
     * Define a function to handle the update/delete by checkbox
     */

    // console.log(data)
    // console.log(state);
  };

  return (
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
  );
}
export default TableData