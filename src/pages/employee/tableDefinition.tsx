import { GridColDef } from '@mui/x-data-grid';

export type TableDefinition = {
  displayName: string,
  email: string,
  uid: string
  id: string,
};
export const columnsDefinition: GridColDef[] = [
  { field: 'displayName', width: 300, headerName: 'Nickname' },
  { field: 'email', width: 300, headerName: 'Email' },
];
