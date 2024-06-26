import AxiosInstance from "./AxiosInstance"
import { React, useEffect, useState, useMemo } from 'react'
import { Box, IconButton } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import { Edit as EditIcon, Delete as DeleteIcon, Chat } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useAuth } from './AuthContext';


const Reports = () => {

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
                size: 30,
            },
            {
                accessorKey: 'learner_surname',
                header: 'Last Name',
                size: 30,
            },
            {
                accessorKey: 'learner_cell_phone_number',
                header: 'Learner Cell',
                size: 30,
            },
            {
                accessorKey: 'grade',
                header: 'Grade',
                size: 30,
            },
            {
                accessorKey: 'parent',
                header: 'Admin ID',
                size: 30,
            },
        ],
        [],

    );

    return (
        <div>
            {loading ? <p>Loading data...</p> :
                <MaterialReactTable
                    columns={columns}
                    data={myData}
                    enableRowActions

                    renderRowActions={({ row }) => (
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
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
    )
};


export default Reports