import AxiosInstance from "./AxiosInstance"
import { React, useEffect, useState, useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import MyMessage from './Message';
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext';

const ApplicationApproval = () => {

    const [myData, setMyData] = useState([])
    const [loading, setLoading] = useState(true)
    const [ShowMessage, setShowMessage] = useState(false)
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleMoveToBus = (application) => {
        const payload = {
            application_id: application.id,
            learner_id: application.learner_id,
            bus_route: application.bus_route,
            pickup_number: application.pickup_number,
            dropoff_number: application.dropoff_number,
            pickup_name: application.pickup_name,
            dropoff_name: application.dropoff_name,
            pickup_time: application.pickup_time,
            dropoff_time: application.dropoff_time
        };

        AxiosInstance.post(`/move_to_bus_table/${application.bus_route}/`, payload)
            .then(response => {
                console.log('Learner added to bus:', response.data);
                setShowMessage(true);
                setTimeout(() => {
                    navigate('/reports');
                }, 4000);
                AxiosInstance.post('send-confirmation-email/', { email: user.email })
                    .then(response => {
                        console.log('Email sent successfully:', user.email);
                        console.log('Email sent successfully:', response.data);
                    })
                    .catch(error => {
                        console.error('Error sending email:', error);
                    });
            })
            .catch(error => {
                console.error('Error adding learner to bus:', error);
            });
    };

    useEffect(() => {
        AxiosInstance.get(`/application-approval/`).then((res) => {
            setMyData(res.data)
            console.log(res.data)
            setLoading(false)
            console.log('Data fetched:', res.data)
        })
            .catch(error => {
                console.error('Error fetching Application data:', error);
                setLoading(false);
            });
    }, []);

    const columns = [
        {
            accessorKey: 'actions',
            header: 'Actions',
            size: 75,
            Cell: ({ row }) => (
                <button onClick={() => handleMoveToBus(row.original)}>Add to Bus</button>
            )
        },
        { accessorKey: 'learner_id', header: 'Learner ID', size: 55 },
        { accessorKey: 'bus_route', header: 'Bus Route', size: 75 },
        { accessorKey: 'pickup_number', header: 'Pickup Number', size: 75 },
        { accessorKey: 'pickup_time', header: 'Pickup Time', size: 75 },
        { accessorKey: 'dropoff_time', header: 'Dropoff Time', size: 75 },
        { accessorKey: 'application_date', header: 'Application Date', size: 75 },
        { accessorKey: 'application_status', header: 'Application Status', size: 75 },
        { accessorKey: 'waiting_list_number', header: 'Waiting List Number', size: 10 },
    ];

    return (
        <div className='myWebBackgroundWrapper'>
            <div className='myWebBackground'></div>
            <div className="page-content">
                {ShowMessage && (<MyMessage text={"You have successfully moved a learner to their bus table. You will be directed to the Bus Reports shortly."} />)}
                <Box sx={{ marginBottom: '10px', borderRadius: '10px' }}>
                    <Typography className='itemBox bg'>
                        Applications Approval Page
                    </Typography>
                </Box>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <MaterialReactTable columns={columns} data={myData} />
                )}
            </div>
        </div>
    );
};


export default ApplicationApproval