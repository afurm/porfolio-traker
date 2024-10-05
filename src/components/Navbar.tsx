import React from 'react';
import Link from 'next/link';

import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';

const Navbar: React.FC = () => {

  
  return (
    <AppBar position="static" sx={{ backgroundColor: '#282c34' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <a style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Crypto Portfolio Tracker</a>
          </Link>
        </Typography>
        <Box>
          <Link href="/dashboard" passHref>
            <Button color="inherit" sx={{ marginRight: 1 }}>Dashboard</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;