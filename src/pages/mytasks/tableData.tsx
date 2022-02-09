import { FC } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { columnsDefinition, TableDefinition } from './tableDefinition';

type TableDataProps = {
  data: TableDefinition[];
};

const TableData: FC<TableDataProps> = ({ data }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columnsDefinition}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
export default TableData