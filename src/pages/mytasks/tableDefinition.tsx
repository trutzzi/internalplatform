import { Checkbox } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Moment from 'react-moment';
import { toolTipOrText } from '../../utils';

export type TableDefinition = {
  title: string;
  description: string;
  uid: string;
  deadline: string;
};

const renderCellFormat = (value: GridRenderCellParams) => <Checkbox checked={value.value} />;

const gridTooltip = (data: GridRenderCellParams) =>
  data.value ? toolTipOrText(data.value, 20) : '';

const formatDate = (data: GridRenderCellParams) =>
  data.value ? <Moment format="DD-MM-YYYY hh:mm">{data.value}</Moment> : '';

export const columnsDefinition: GridColDef[] = [
  {
    field: 'done',
    width: 100,
    headerName: 'Done',
    renderCell: renderCellFormat
  },
  {
    field: 'doneAt',
    width: 130,
    headerName: 'Done at',
    renderCell: formatDate
  },
  { field: 'title', width: 200, headerName: 'Title' },
  { field: 'description', width: 200, headerName: 'Description', renderCell: gridTooltip },
  {
    field: 'deadline',
    width: 300,
    renderCell: formatDate,
    headerName: 'Deadline'
  }
];
