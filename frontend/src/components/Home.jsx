import React from 'react';
import '../App.css';
import { Typography, Card, CardContent } from '@mui/material';
import schoolBus from '../assets/school_bus.png'; // Import the image

const Home = () => {
  return (
    <div className='homeBackgroundWrapper'>
      <Typography variant='h3' className='welcome-heading' style={{ fontFamily: 'Helvetica, arial' }}>
        Impumelelo  
      </Typography>
      <Typography variant='h4' className='welcome-heading' style={{ fontFamily: 'Helvetica, serif', color: 'rgb(255,151,255)' }}>
        ~Educating for a brighter future~
      </Typography>

      <footer style={{ marginTop: '30px', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px' }}>
        <Typography variant='body1' style={{ fontFamily: 'Georgia, serif', paddingRight: '20px' }}>
          © 2024 Impumelelo High School. All rights reserved. |
        </Typography>
        <Typography variant='body1' style={{ fontFamily: 'Georgia, serif' }}>
          |Contact us: info@impumelelo-high.co.za
        </Typography>
      </footer>
    </div>
  );
}

export default Home;
