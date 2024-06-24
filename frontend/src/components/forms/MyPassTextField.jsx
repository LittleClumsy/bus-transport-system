import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Controller} from 'react-hook-form';
import { FormHelperText } from '@mui/material';

export default function MyPassField(props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const {name, control, label} = props

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Controller
    name = {name}
    control = {control}
    defaultValue=""
    render= {({
      field:{onChange, value},
      fieldState: {error},
      formState,
  }) => ( 
    <FormControl variant="standard" className={"myForm"}>
          <InputLabel htmlFor="password">{label}</InputLabel>
          <Input
            id="password"
            onChange={onChange}
            value={value}
            error={!!error}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
          />

          <FormHelperText sx={{color:"#d32f2f"}}>{error?.message}</FormHelperText>

          </FormControl>     
  )
} 
/>

);
}


        
       