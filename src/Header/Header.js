import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Header = () => {
  // const users = []
  localStorage.setItem("users",JSON.stringify([]))

  return (
    <Box sx={{ flexGrow: 1, }}>
      <AppBar position="fixed" sx={{bgcolor:"grey",}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link to='' style={{color:'white' }} >
            <Button color="inherit">Login</Button>
          </Link>
          <Link to='/register' style={{color:'white' }}>
          <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header