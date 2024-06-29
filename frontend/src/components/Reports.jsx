import AxiosInstance from "./AxiosInstance"
import { React, useEffect, useState, useMemo } from 'react'
import { Box, IconButton } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
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
        { accessorKey: 'learner_id', header: 'Learner ID' },
        { accessorKey: 'bus_route', header: 'Bus Route' },
        { accessorKey: 'pickup_number', header: 'Pickup Number' },
        { accessorKey: 'dropoff_number', header: 'Dropoff Number' },
        { accessorKey: 'pickup_name', header: 'Pickup Name' },
        { accessorKey: 'dropoff_name', header: 'Dropoff Name' },
        { accessorKey: 'pickup_time', header: 'Pickup Time' },
        { accessorKey: 'dropoff_time', header: 'Dropoff Time' },
    ];

    return (
        <div className='myWebBackgroundWrapper'>
            <div className='myWebBackground'></div>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <MaterialReactTable columns={columns} data={myData}  />
                )}
            </div>
        </div>
    );
};


export default Reports