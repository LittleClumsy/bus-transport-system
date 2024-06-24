import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form';
import '../../App.css'

export default function MyEmailTextField(props) {
  const {label, name, control} = props

  return (
    <Controller
        name = {name}
        control = {control}
        defaultValue=""
        render= {({
          field:{onChange, value},
          fieldState: { error }
      }) => (      
        <TextField 
        className={"myForm"}
        id="standard-basic" 
        onChange={onChange}
        value={value}
        label={label}
        variant="standard" 
        error = {!!error}
        helperText = {error?.message}
        />
        )
    }
    />
  );
}