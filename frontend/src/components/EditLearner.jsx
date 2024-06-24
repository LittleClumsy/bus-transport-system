import { React, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import MyButton from './forms/MyButton'
import MyTextField from './forms/MyTextFields'
import GradeField from './forms/GradeField'
import { useForm } from 'react-hook-form'
import AxiosInstance from './AxiosInstance'
import { useAuth } from './AuthContext';
import { useNavigate, useParams } from 'react-router-dom'


const EditLearner = () => {
    const MyParam = useParams();
    const navigate = useNavigate();
    const MyId = MyParam.id;

    const defaultValues = {
        parent: '',
        id: '',
        learner_name: '',
        learner_surname: '',
        learner_cell_phone_number: '',
        grade: ''
    }
    const { user } = useAuth();


    const GetData = () => {
        AxiosInstance.get(`learner/${MyId}`).then((res) => {
            console.log(res.data)
            setValue('learner_name', res.data.learner_name)
            setValue('learner_surname', res.data.learner_surname)
            setValue('learner_cell_phone_number', res.data.learner_cell_phone_number)
            setValue('grade', res.data.grade)
        })
    }

    useEffect(() => {
        GetData();
    }, [])


    const { handleSubmit, control, setValue } = useForm({ defaultValues: defaultValues });

    const submission = (data) => {
        const payload = {
            parent: user.id,
            id: data.id,
            learner_name: data.learner_name,
            learner_surname: data.learner_surname,
            learner_cell_phone_number: data.learner_cell_phone_number,
            grade: data.grade
        };

        AxiosInstance.put(`learner/${MyId}/`, payload)
            .then(response => {
                console.log('Submission successful:', response.data)
                navigate(`/yourlearner`)
            })
            .catch(error => {
                console.error('Error during submission:', error);
            });

        console.log('Form Data:', payload);
        console.log('User ID:', user.id);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(submission)}>

                <Box sx={{ marginBottom: '10px' }}>
                    <Typography className='itemBox bg'>
                        Create Learner Record
                    </Typography>

                </Box>

                <Box sx={{ boxShadow: 3, padding: 3 }}>

                    <Box >

                        <Box sx={{ width: '10%' }} className={"itemBox"}>
                            <MyTextField
                                label="First Name"
                                name="learner_name"
                                control={control}
                                className="myForm"
                            />
                        </Box>

                        <Box sx={{ width: '10%' }} className={"itemBox"}>
                            <MyTextField
                                label="Last name"
                                name="learner_surname"
                                control={control}
                                className="myForm"
                            />
                        </Box>

                    </Box>

                    <Box>

                        <Box sx={{ width: '10%' }} className={"itemBox"}>
                            <MyTextField
                                label="Cell"
                                name="learner_cell_phone_number"
                                control={control}
                                className="myForm"
                            />
                        </Box>

                        <Box sx={{ width: '10%', justifyContent: 'normal' }} className={"itemBox"}>
                            <GradeField
                                label="Grade"
                                name="grade"
                                control={control}
                                className="myForm"
                            />
                        </Box>
                    </Box>

                    <Box sx={{ marginTop: '20px' }}>
                        <Box className={"itemBox"} sx={{ width: '25%' }} >
                            <MyButton
                                label={"Submit"}
                                type={"submit"}
                            />
                        </Box>
                    </Box>
                </Box>
            </form>
        </div>
    )
}

export default EditLearner