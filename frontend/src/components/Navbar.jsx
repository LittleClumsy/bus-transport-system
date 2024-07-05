import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { Link, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AxiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Grid from '@mui/material/Grid';
import school_logo from '../assets/School_logo.webp';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonIcon from '@mui/icons-material/Person';


const drawerWidth = 240;

export default function Navbar(props) {
  const { content } = props
  const location = useLocation()
  const path = location.pathname
  const navigate = useNavigate()

  const { user, loading } = useAuth();

  const logoutUser = () => {
    AxiosInstance.post(`logoutall/`, {})
      .then((response) => {
        localStorage.removeItem('Token');
        navigate('/');
      });
  };

  const [open, setOpen] = React.useState(false);

  const changeOpenStatus = () => {
    setOpen(!open)
  }

  const myDrawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: 'visible' }}>
        <List>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/home" selected={"/home" === path}>
              <ListItemIcon>
                <HomeIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>

          {user && user.is_admin && (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/reports" selected={"/reports" === path}>
                <ListItemIcon>
                  <InfoIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary={"Bus Reports"} />
              </ListItemButton>
            </ListItem>
          )}

          {user && user.is_admin && (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/applicationapproval" selected={"/applicationapproval" === path}>
                <ListItemIcon>
                  <DirectionsBusIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary={"Application Approval"} />
              </ListItemButton>
            </ListItem>
          )}

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/busform" selected={"/busform" === path}>
              <ListItemIcon>
                <DirectionsBusIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary={"Bus Form"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/create" selected={"/create" === path}>
              <ListItemIcon>
                <PersonAddIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary={"Register Learner"} />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding>
            <ListItemButton component={Link} to="/yourlearner" selected={"/yourlearner" === path}>
              <ListItemIcon>
                <PeopleOutlineIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary={"Your Learners"} />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding>
            <ListItemButton onClick={logoutUser}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>

  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'rgb(91, 10, 152)' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={changeOpenStatus}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{ color: 'pink' }} />
          </IconButton>
          <Grid container justifyContent="space-between" alignItems='center'>
            <Box display="flex" alignItems='center'>
              <img src={school_logo} alt="School Logo" style={{ width: '50px', marginRight: '10px' }} />
              <Typography variant="h6" noWrap component="div" >
                IMPUMELELO HIGH SCHOOL
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PersonIcon style={{ marginRight: '8px' }} />
              <Typography variant="h6">
                {user ? user.email : ""}
              </Typography>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>


      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'rgb(91, 10, 152)',
            color: 'white',
          },
        }}
      >

        {myDrawer}

      </Drawer>

      <Drawer
        variant="temporary"
        open={open}
        onClose={changeOpenStatus}
        sx={{
          display: { xs: 'block', sm: 'none' },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth, boxSizing: 'border-box',
            background: 'radial-gradient(circle, rgba(63,209,251,1) 0%, rgba(180,70,252,1) 100%)',
            color: 'white',
          },

        }}
      >

        {myDrawer}

      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 0.2 }}>
        <Toolbar />

        {content}

      </Box>
    </Box>
  );
}
