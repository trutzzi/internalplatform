import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import moment from "moment";
import Moment from 'react-moment';

export type TableDefinition = {
  title: string,
  description: string,
  uid: string
  deadline: string,
  assigned: string,
};

const getNameAssigned = (value: any) => value.value[0].displayName;

const formatDate = (data: GridRenderCellParams) => <Moment format="DD-MM-YYYY hh:mm">{data.value}</Moment>

export const columnsDefinition: GridColDef[] = [
  { field: 'title', width: 300, headerName: 'Title' },
  { field: 'description', width: 250, headerName: 'Description' },
  { field: 'deadline', width: 180, renderCell: formatDate, headerName: "Deadline" },
  { field: 'user', width: 300, headerName: "Employee", valueFormatter: getNameAssigned },
];