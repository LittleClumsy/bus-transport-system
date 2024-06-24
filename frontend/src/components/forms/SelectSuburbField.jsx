import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';

export default function SelectSuburbField(props) {
  const [SelectSuburbField, setSelectSuburbField] = React.useState('');
  const { label, name, control } = props
  const handleChange = (event) => {
    setSelectSuburbField(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ width: '25%' }} >
      <InputLabel id="selectsuburbfield-selector">{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({
          field: { onChange, value },
          fieldState: { invalid, error },
          formState,
        }) => (
          <Select
            labelId="selectsuburbfield-selector-label"
            id="selectsuburbfield-selector-standard"
            onChange={(event) => onChange(event.target.value)}
            value={value}
            label={label}
          >
            <MenuItem value={"Milnerton"}>Milnerton</MenuItem>
            <MenuItem value={"Blouberg"}>Blouberg</MenuItem>
            <MenuItem value={"Goodwood"}>Goodwood</MenuItem>
            <MenuItem value={"Edgemead"}>Edgemead</MenuItem>
            <MenuItem value={"Ndabeni"}>Ndabeni</MenuItem>
            <MenuItem value={"Observatory"}>Observatory</MenuItem>
          </Select>
        )
        }
      />
    </FormControl>
  );
}