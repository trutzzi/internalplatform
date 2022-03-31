import { Tooltip } from '@mui/material';

export const toolTipOrText = (value: string, nrChar: number) =>
  value.length > nrChar ? (
    <Tooltip title={value}>
      <p>{value.substring(0, nrChar)}...</p>
    </Tooltip>
  ) : (
    <p>{value}</p>
  );
