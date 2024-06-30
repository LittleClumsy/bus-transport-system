import React from 'react'
import '../App.css'
import { Typography } from '@mui/material'
import school_bus from '../assets/school_bus.png'

const Home = () => {
  return (
    <div className='homeBackgroundWrapper'>
    <div className='myWebBackground'></div>
      <Typography variant='h3' className='welcome-heading'>
        Welcome to the School Management System</Typography>
    </div>
  )
}

export default Home