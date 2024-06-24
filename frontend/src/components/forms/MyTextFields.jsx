import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

export default function MyTextField(props) {
  const { label, name, control, className } = props
  return (

    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({
        field: { onChange, value },
        fieldState: { invalid, error },
        formState,
      }) => (
        <TextField
          className={className}
          id="standard-basic"
          onChange={onChange}
          value={value}
          label={label}
          variant="standard"
        />
      )
      }
    />
  );
}