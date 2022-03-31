import { FC } from 'react';
import { InputLabel, Select, MenuItem } from '@mui/material';

type Option = { label: string; value: string | number };

type DropdownAsyncProps = {
  items: Option[];
  handleChange: any;
  label: string;
  defaultValue?: string;
  name?: string;
  fullWidth?: boolean;
};

const DropdownAsync: FC<DropdownAsyncProps> = ({
  items,
  handleChange,
  label,
  defaultValue,
  name,
  fullWidth = true
}) => {
  const renderItems = () =>
    items.map((item, index) => (
      <MenuItem key={index} value={item.value}>
        {item.label}
      </MenuItem>
    ));
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Select
        fullWidth={fullWidth}
        placeholder="Select value"
        label={label}
        required
        name={name}
        value={defaultValue ?? ''}
        onChange={handleChange}
      >
        {renderItems()}
      </Select>
    </>
  );
};

export default DropdownAsync;
