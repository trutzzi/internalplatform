import { FC } from 'react';
import { InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';

type Option = { label: string, value: string | number };

type DropdownAsyncProps = {
  items: Option[];
  handleChange: React.Dispatch<React.SetStateAction<string>>
  label: string
}

const DropdownAsync: FC<DropdownAsyncProps> = ({ items, handleChange, label }) => {
  const renderItems = () => items.map(item => <MenuItem value={item.value}>{item.label}</MenuItem>)
  return (<>
    <InputLabel>{label}</InputLabel>
    <Select
      placeholder="Select value"
      label={label}
      style={{
        width: '220px'
      }}
      required
      onChange={(e: SelectChangeEvent) => handleChange(e.target.value)}
    >
      {renderItems()}
    </Select>
  </>)
};

export default DropdownAsync;