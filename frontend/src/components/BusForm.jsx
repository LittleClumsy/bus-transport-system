import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid } from '@mui/material'
import MyButton from './forms/MyButton'
import TimeSelectField from './forms/TimeSelectField'
import SelectSuburbField from './forms/SelectSuburbField'
import SelectLearnerField from './forms/SelectLearnerField'
import { useForm, useWatch } from 'react-hook-form'
import AxiosInstance from './AxiosInstance'
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom'
import '../App.css';
import MyMessage from './Message';



const BusForm = () => {

    const defaultValues = {
        learner_id: '',
        bus_route: '',
        pickup_number: '',
        dropoff_number: '',
        pickup_name: '',
        dropoff_name: '',
        pickup_time: '',
        dropoff_time: '',
        application_status: 'Pending',
        parent_id: '',
    }
    const { user } = useAuth();
    const { handleSubmit, control, setValue } = useForm({ defaultValues: defaultValues });
    const navigate = useNavigate();
    const [ShowMessage, setShowMessage] = useState(false)

    const dropoffOptions = [
        { value: '15:30 PM', label: '15:30 PM' },
        { value: '16:30 PM', label: '16:30 PM' },
        { value: '17:00 PM', label: '17:00 PM' }
    ];

    const suburbData = {
        Milnerton: {
            pickup_number: '1A',
            dropoff_number: '1A',
            pickup_name: 'Milnerton',
            dropoff_name: 'Impumelelo',
            bus_route: '1',
            pickup_time: '7:00 AM'
        },
        Blouberg: {
            pickup_number: '1B',
            dropoff_number: '1B',
            pickup_name: 'Blobuerg',
            dropoff_name: 'Impumelelo',
            bus_route: '1',
            pickup_time: '7:30 AM'
        },
        Goodwood: {
            pickup_number: '2A',
            dropoff_number: '2A',
            pickup_name: 'Goodwood',
            dropoff_name: 'Impumelelo',
            bus_route: '2',
            pickup_time: '7:00 AM'
        },
        Edgemead: {
            pickup_number: '2B',
            dropoff_number: '2B',
            pickup_name: 'Edgemead',
            dropoff_name: 'Impumelelo',
            bus_route: '2',
            pickup_time: '7:30 AM'
        },
        Ndabeni: {
            pickup_number: '3A',
            dropoff_number: '3A',
            pickup_name: 'Ndabeni',
            dropoff_name: 'Impumelelo',
            bus_route: '3',
            pickup_time: '7:00 AM'
        },
        Observatory: {
            pickup_number: '3B',
            dropoff_number: '3B',
            pickup_name: 'Observatory',
            dropoff_name: 'Impumelelo',
            bus_route: '3',
            pickup_time: '7:30 AM'
        },
    };

    const selectedSuburb = useWatch({
        control,
        name: 'Suburb',
    });

    useEffect(() => {
        if (selectedSuburb && suburbData[selectedSuburb]) {
            setValue('bus_route', suburbData[selectedSuburb].bus_route);
            setValue('pickup_number', suburbData[selectedSuburb].pickup_number);
            setValue('dropoff_number', suburbData[selectedSuburb].dropoff_number);
            setValue('pickup_name', suburbData[selectedSuburb].pickup_name);
            setValue('dropoff_name', suburbData[selectedSuburb].dropoff_name);
            setValue('pickup_time', suburbData[selectedSuburb].pickup_time);
        }
    }, [selectedSuburb, setValue]);




    const submission = (data) => {
        const payload = {
            learner_id: data.learner_id,
            bus_route: data.bus_route,
            pickup_number: data.pickup_number,
            dropoff_number: data.dropoff_number,
            pickup_name: data.pickup_name,
            dropoff_name: data.dropoff_name,
            pickup_time: data.pickup_time,
            dropoff_time: data.dropoff_time,
            application_status: data.application_status,
            waiting_list_number: data.waiting_list_number,
            parent_id: user.id,
        };
        console.log('Form Data:', payload);

        AxiosInstance.post('apply-bus/', payload)
            .then(response => {
                console.log('Submission successful:', response.data);
                setShowMessage(true);
                setTimeout(() => {
                    navigate('/home');
                }, 4000);
                AxiosInstance.post('send-confirmation-email/', { email: user.email})
                .then(response => {
                    console.log('Email sent successfully:', response.data);
                })
                .catch(error => {
                    console.error('Error sending email:', error);
                });
            })
            .catch(error => {
                console.error('Error during submission:', error);
            });
    };

    return (
        <div className='myWebBackgroundWrapper'>
    <div className='myWebBackground'></div>
        <div>
            {ShowMessage && (<MyMessage text={"You have successfully registered a Learner for the bus system. Your application is being processed."} />)}
            <form onSubmit={handleSubmit(submission)}>

                <Box sx={{ marginBottom: '10px' }}>
                    <Typography className='itemBox bg'>
                        Add a Learner to a Bus
                    </Typography>

                </Box>

                <Box sx={{ boxShadow: 3, padding: 3 }}>

                    <Grid container spacing={3} >
                        <Grid item xs={12} sm={6}>
                            <SelectLearnerField
                                label="Learner Name"
                                name="learner_id"
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <SelectSuburbField
                                label="Select Suburb"
                                name="Suburb"
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} sx={{ width: '10%' }}>
                            <TimeSelectField
                                label="Dropoff Time"
                                name="dropoff_time"
                                control={control}
                                options={dropoffOptions}
                            />
                        </Grid>

                    </Grid>

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

export default BusForm