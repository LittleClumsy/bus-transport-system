import AxiosInstance from "./AxiosInstance"
import { React, useEffect, useState, useMemo } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useAuth } from './AuthContext';


const YourLearner = () => {

    const [myData, setMyData] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth();

    const GetData = () => {
        AxiosInstance.get(`learner-list/`).then((res) => {
            setMyData(res.data)
            console.log(res.data)
            setLoading(false)
            console.log('Data fetched:', res.data)
        })
    }

    useEffect(() => {
        if (user) {
            GetData();
        }
    }, [user])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'learner_name',
                header: 'Learner Name',
                size: 250,
            },
            {
                accessorKey: 'learner_surname',
                header: 'Last Name',
                size: 250,
            },
            {
                accessorKey: 'learner_cell_phone_number',
                header: 'Learner Cell',
                size: 250,
            },
            {
                accessorKey: 'grade',
                header: 'Grade',
                size: 250,
            },
            {
                accessorKey: 'parent',
                header: 'Admin ID',
                size: 250,
            },
        ],
        [],

    );

    return (
        <div className='myWebBackgroundWrapper'>
            <div className='myWebBackground'></div>
            <div className="page-content">
                <Box sx={{ marginBottom: '10px', borderRadius: '10px' }}>
                    <Typography className='itemBox bg'>
                        Your Learners
                    </Typography>

                </Box>
                {loading ? <p>Loading data...</p> :
                    <MaterialReactTable
                        columns={columns}
                        data={myData}
                        enableRowActions

                        renderRowActions={({ row }) => (
                            <Box sx={{ display: 'flex',  gap: '12px' }}>
                                <IconButton color="secondary" component={Link} to={`edit/${row.original.id}`}>
                                    <EditIcon />
                                </IconButton>

                                <IconButton color="error" component={Link} to={`delete/${row.original.id}`}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        )}
                    />
                }
            </div>
        </div>
    )
};


export default YourLearner