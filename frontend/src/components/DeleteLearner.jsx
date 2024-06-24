import { React, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import MyButton from './forms/MyButton'
import AxiosInstance from './AxiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'


const DeleteLearner = () => {
    const MyParam = useParams();
    const navigate = useNavigate();
    const MyId = MyParam.id;

    const { handleSubmit } = useForm();

    const [myData, setMyData] = useState()
    const [loading, setLoading] = useState(true)

    const GetData = () => {
        AxiosInstance.get(`learner/${MyId}/`).then((res) => {
            setMyData(res.data)
            console.log(res.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        GetData();
    }, [])

    const submission = (data) => {
        AxiosInstance.delete(`learner/${MyId}/`)
            .then(res => {
                console.log('Submission successful:', res.data)
                navigate(`/yourlearner`)
            })
            .catch(error => {
                console.error('Error during submission:', error);
            });

    };

    return (
        <div>
            {loading ? <p>Loading data...</p> :
                <form onSubmit={handleSubmit(submission)}>
                    <Box sx={{ marginBottom: '10px' }}>
                        <Typography className='itemBox bg'>
                            Delete Learner Record: {myData.learner_name}
                        </Typography>
                    </Box>

                    <Box sx={{ boxShadow: 3, padding: 3 }}>

                        <Box sx={{ marginTop: '20px' }}>
                            Are you sure you want to delete the following learner record: {myData.learner_name}?
                            <Box className={"itemBox"} sx={{ width: '25%' }} >
                                <MyButton
                                    label={"Delete Learner"}
                                    type={"submit"}
                                />
                            </Box>
                        </Box>
                    </Box>
                </form>
            }
        </div>
    )
}

export default DeleteLearner