import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Moment from 'react-moment';
import DoneIcon from '@mui/icons-material/Done';
import PendingIcon from '@mui/icons-material/Pending';

export type TableDefinition = {
  title: string,
  description: string,
  uid: string
  deadline: string,
  assigned: string,
};

const getNameAssigned = ({ value }: any) => (value ? value[0]?.displayName : '');
const getCompleteStatus = ({ value }: GridRenderCellParams) => (value ? <DoneIcon /> : <PendingIcon />);

const formatDate = (data: GridRenderCellParams) => <Moment format="DD-MM-YYYY hh:mm">{data.value}</Moment>;

export const columnsDefinition: GridColDef[] = [
  { field: 'title', width: 300, headerName: 'Title' },
  { field: 'description', width: 250, headerName: 'Description' },
  {
    field: 'deadline', width: 180, renderCell: formatDate, headerName: 'Deadline',
  },
  {
    field: 'user', width: 180, headerName: 'Employee', valueFormatter: getNameAssigned,
  },
  {
    field: 'done', width: 100, headerName: 'Completed', renderCell: getCompleteStatus,
  },
];
