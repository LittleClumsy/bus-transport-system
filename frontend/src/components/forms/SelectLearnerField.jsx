import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller, set } from 'react-hook-form';
import AxiosInstance from '../AxiosInstance';

export default function SelectLearnerField(props) {
  const [learners, setLearners] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const GetData = () => {
      AxiosInstance.get(`learner-list/`)
        .then((res) => {
          setLearners(res.data);
          setLoading(false);
          console.log('Learner Names:', res.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    };

    GetData();
  }, []);

  const { label, name, control, className } = props;

  return (
    <FormControl variant="standard" sx={{ width: '25%' }} className={className}>
      <InputLabel id="learner-selector">{label}</InputLabel>
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
            labelId="learner-selector-label"
            id="learner-selector-standard"
            onChange={onChange}
            value={value}
            label={label}
          >
            {loading ? (
              <MenuItem value="">
                <em>Loading...</em>
              </MenuItem>
            ) : (
              learners.map((learner) => (
                <MenuItem key={learner.id} value={learner.id}>
                  {learner.learner_name}
                </MenuItem>
              ))
            )}
          </Select>
        )}
      />
    </FormControl>
  );
}
