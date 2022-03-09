import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Moment from 'react-moment';

export type TableDefinition = {
  title: string,
  description: string,
  uid: string
  deadline: string,
};
const formatDate = (data: GridRenderCellParams) => <Moment format="DD-MM-YYYY hh:mm">{data.value}</Moment>;
export const columnsDefinition: GridColDef[] = [
  { field: 'title', width: 300, headerName: 'Title' },
  { field: 'description', width: 300, headerName: 'Description' },
  {
    field: 'deadline', width: 300, renderCell: formatDate, headerName: 'Deadline',
  },
];
