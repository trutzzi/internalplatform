import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Moment from 'react-moment';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { toolTipOrText } from '../../utils';

export type TableDefinition = {
  title: string;
  description: string;
  uid: string;
  deadline: string;
  assigned: string;
};

const getNameAssigned = ({ value }: any) => (value ? value[0]?.displayName : '');
const getCompleteStatus = ({ value }: GridRenderCellParams) => (value ? <DoneIcon /> : '');
const getEditAction = () => <EditIcon style={{ cursor: 'pointer', textAlign: 'center' }} />;

const formatDate = (data: GridRenderCellParams) =>
  data.value ? <Moment format="DD-MM-YYYY hh:mm">{data.value}</Moment> : '';

const gridTooltip = (data: GridRenderCellParams) =>
  data.value ? toolTipOrText(data.value, 20) : '';

export const columnsDefinition: GridColDef[] = [
  { field: 'title', width: 200, headerName: 'Title' },
  { field: 'description', width: 200, headerName: 'Description', renderCell: gridTooltip },
  {
    field: 'deadline',
    width: 180,
    renderCell: formatDate,
    headerName: 'Deadline'
  },
  {
    field: 'user',
    width: 120,
    headerName: 'Employee',
    valueFormatter: getNameAssigned
  },
  {
    field: 'done',
    width: 80,
    headerName: 'Done',
    renderCell: getCompleteStatus
  },
  {
    field: 'doneAt',
    width: 140,
    headerName: 'Done at',
    renderCell: formatDate
  },
  {
    field: 'action',
    width: 80,
    headerName: 'Action',
    renderCell: getEditAction
  }
];
