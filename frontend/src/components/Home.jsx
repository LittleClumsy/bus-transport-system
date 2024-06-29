import React from 'react'
import '../App.css'
import { Typography } from '@mui/material'
import school_bus from '../assets/school_bus.png'

const Home = () => {
  return (
    <div className='myWebBackgroundWrapper'>
    <div className='myWebBackground'></div>
      <Typography variant='h3' className='welcome-heading'>
        Welcome to the School Management System</Typography>
      <div className='home-page-img-container'>
        <img src={school_bus} alt='School Bus' className='home-page-img'/>
      </div>
    </div>
  )
}

export default Home