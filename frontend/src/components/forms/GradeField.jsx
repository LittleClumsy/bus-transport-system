import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';

export default function GradeField(props) {
  const [grade, setGrade] = React.useState('');
  const { label, name, control, } = props
  const handleChange = (event) => {
    setGrade(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ width: '25%' }} >
      <InputLabel id="grade-selector">{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { invalid, error },
          formState,
        }) => (
          <Select
            labelId="grade-selector-label"
            id="grade-selector-standard"
            onChange={onChange}
            value={value}
            label={label}
          >
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        )
        }
      />
    </FormControl>
  );
}