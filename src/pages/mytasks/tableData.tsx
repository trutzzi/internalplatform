import { FC } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columnsDefinition, TableDefinition } from './tableDefinition';

type TableDataProps = {
  data: TableDefinition[];
  currentlySelected: any;
};

const TableData: FC<TableDataProps> = ({ data, currentlySelected }) => (
  <div style={{ width: '100%' }}>
    <DataGrid
      rows={data}
      columns={columnsDefinition}
      pageSize={25}
      autoHeight
      onCellClick={currentlySelected}
      rowsPerPageOptions={[5]}
      checkboxSelection={false}
    />
  </div>
);
export default TableData;
