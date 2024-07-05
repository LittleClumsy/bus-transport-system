import { React, useState } from 'react'
import { Box, Typography } from '@mui/material'
import MyButton from './forms/MyButton'
import MyTextField from './forms/MyTextFields'
import GradeField from './forms/GradeField'
import { useForm } from 'react-hook-form'
import AxiosInstance from './AxiosInstance'
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom'
import MyMessage from './Message';

const CreateLearner = () => {

    const defaultValues = {
        parent: '',
        learner_name: '',
        learner_surname: '',
        learner_cell_phone_number: '',
        grade: ''
    }
    const { user } = useAuth();
    const navigate = useNavigate();
    const [ShowMessage, setShowMessage] = useState(false)


    const { handleSubmit, control } = useForm({ defaultValues: defaultValues });

    const submission = (data) => {
        const payload = {
            parent: user.id,
            learner_name: data.learner_name,
            learner_surname: data.learner_surname,
            learner_cell_phone_number: data.learner_cell_phone_number,
            grade: data.grade
        }

        AxiosInstance.post('learner/', payload)
            .then(response => {
                console.log('Submission successful:', response.data);
                setShowMessage(true);
                setTimeout(() => {
                    navigate('/yourlearner');
                }, 4000)
            })
            .catch(error => {
                console.error('Error during submission:', error);
            });

        console.log('Form Data:', user);
        console.log('User ID:', user.id);
    };

    return (
        <div className='formBackgroundWrapper'>
    <div className='myWebBackground'></div>
        <div className="page-content">
            {ShowMessage && (<MyMessage text={"You have successfully added a learner. You will be directed to your learners."} />)}
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

                        <Box sx={{ width: '20%', justifyContent: 'normal' }} className={"itemBox"}>
                            <GradeField
                                label="Grade"
                                name="grade"
                                control={control}
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
        </div>
    )
}

export default CreateLearner