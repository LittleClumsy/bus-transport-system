import AxiosInstance from "./AxiosInstance"
import { React, useEffect, useState, useMemo } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import { Edit as EditIcon, Delete as DeleteIcon, Padding } from '@mui/icons-material';
import { Link } from "react-router-dom";

import { useAuth } from './AuthContext';


const Reports = () => {

    const [myData, setMyData] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth();

    useEffect(() => {
        AxiosInstance.get(`/all-busses/`).then((res) => {
            setMyData(res.data)
            console.log(res.data)
            setLoading(false)
            console.log('Data fetched:', res.data)
        })
            .catch(error => {
                console.error('Error fetching bus data:', error);
                setLoading(false);
            });
    }, []);

    const columns = [
        { accessorKey: 'learner_id', header: 'Learner ID', size:100 },
        { accessorKey: 'bus_route', header: 'Bus Route', size:100 },
        { accessorKey: 'pickup_number', header: 'Pickup Number', size:100 },
        { accessorKey: 'dropoff_number', header: 'Dropoff Number', size:100 },
        { accessorKey: 'pickup_name', header: 'Pickup Name', size:100 },
        { accessorKey: 'dropoff_name', header: 'Dropoff Name', size:100 },
        { accessorKey: 'pickup_time', header: 'Pickup Time', size:100 },
        { accessorKey: 'dropoff_time', header: 'Dropoff Time', size:100 },
        // { accessorKey: 'application_status', header: 'Application Status', size:100 },
        // { accessorKey: 'waiting_list_number', header: 'Waiting List Number', size:100 },
    ];

    return (
        <div className='myWebBackgroundWrapper'>
            <div className='myWebBackground'></div>
            <div className="page-content">
            <Box sx={{ marginBottom: '10px', borderRadius: '10px' }}>
                    <Typography className='itemBox bg'>
                        Bus Reports
                    </Typography>
                </Box>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <MaterialReactTable columns={columns} data={myData} enableRowActions 
                    renderRowActions={({ row }) => (
                            <Box sx={{ display: 'flex',  gap: '12px' }}>
                                <IconButton color="error" component={Link} to={`delete/${row.original.id}`}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            )}
                            />
                )}
            </div>
        </div>
    );
};


export default Reports