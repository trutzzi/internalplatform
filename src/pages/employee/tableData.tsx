import { FC } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columnsDefinition, TableDefinition } from './tableDefinition';

type TableDataProps = {
  data: TableDefinition[];
};

const TableData: FC<TableDataProps> = ({ data }) => (
  <div style={{ width: '100%' }}>
    <DataGrid
      rows={data}
      columns={columnsDefinition}
      pageSize={25}
      autoHeight
      rowsPerPageOptions={[5]}
    />
  </div>
);
export default TableData;
