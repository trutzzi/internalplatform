import { FC } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columnsDefinition, TableDefinition } from './tableDefinition';

type TableDataProps = {
  data: TableDefinition[];
};

const TableData: FC<TableDataProps> = ({ data }) => (
  <div style={{ height: 600, width: '100%' }}>
    <DataGrid
      rows={data}
      columns={columnsDefinition}
      pageSize={25}
      rowsPerPageOptions={[5]}
      checkboxSelection
    />
  </div>
);
export default TableData;
