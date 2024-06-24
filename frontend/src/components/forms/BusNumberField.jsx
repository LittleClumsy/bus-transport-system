import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';

export default function BusNumberField(props) {
  const [bus, setBus] = React.useState('');
  const { label, name, control, } = props
  const handleChange = (event) => {
    setBus(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ width: '25%' }} >
      <InputLabel id="bus-selector">{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { invalid, error },
          formState,
        }) => (
          <Select
            labelId="bus-selector-label"
            id="bus-selector-standard"
            onChange={onChange}
            value={value}
            label={label}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        )
        }
      />
    </FormControl>
  );
}