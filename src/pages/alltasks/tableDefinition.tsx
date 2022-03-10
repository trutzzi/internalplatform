import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Moment from 'react-moment';
import DoneIcon from '@mui/icons-material/Done';

export type TableDefinition = {
  title: string,
  description: string,
  uid: string
  deadline: string,
  assigned: string,
};

const getNameAssigned = ({ value }: any) => (value ? value[0]?.displayName : '');
const getCompleteStatus = ({ value }: GridRenderCellParams) => (value ? <DoneIcon /> : '');
const formatDate = (data: GridRenderCellParams) => <Moment format="DD-MM-YYYY hh:mm">{data.value}</Moment>;

export const columnsDefinition: GridColDef[] = [
  { field: 'title', width: 200, headerName: 'Title' },
  { field: 'description', width: 300, headerName: 'Description' },
  {
    field: 'deadline', width: 180, renderCell: formatDate, headerName: 'Deadline',
  },
  {
    field: 'user', width: 120, headerName: 'Employee', valueFormatter: getNameAssigned,
  },
  {
    field: 'done', width: 80, headerName: 'Done', renderCell: getCompleteStatus,
  },
];
