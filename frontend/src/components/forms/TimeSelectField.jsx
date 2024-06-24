import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';

export default function TimeSelectField(props) {
  const { label, name, control, options } = props;

  return (
    <FormControl variant="standard" sx={{ width: '25%' }}>
      <InputLabel id={`${name}-selector`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { invalid, error },
          formState,
        }) => (
          <Select
            labelId={`${name}-selector-label`}
            id={`${name}-selector-standard`}
            onChange={onChange}
            value={value}
            label={label}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}
