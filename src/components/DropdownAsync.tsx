import { FC } from 'react';
import {
  InputLabel, Select,  MenuItem,
} from '@mui/material';

type Option = { label: string, value: string | number };

type DropdownAsyncProps = {
  items: Option[];
  handleChange: any;
  label: string;
  defaultValue?: string;
  name?: string;
};

const DropdownAsync: FC<DropdownAsyncProps> = ({ items, handleChange, label, defaultValue, name }) => {
  const renderItems = () => items.map((item, index) => <MenuItem key={index} value={item.value}>{item.label}</MenuItem>);
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Select
        placeholder="Select value"
        label={label}
        style={{
          width: '220px',
        }}
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
