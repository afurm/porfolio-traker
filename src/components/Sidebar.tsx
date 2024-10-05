import React from 'react';
import Link from 'next/link';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import { FiHome, FiBarChart2, FiDollarSign, FiSettings } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, login, logout } = useAuth(); // Get authentication state and functions

  return (
    <Box
      sx={{
        width: 250,
        p: 2,
        bgcolor: 'background.paper',
        height: '100vh',
        boxShadow: 3,
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          CoinStats
        </Typography>
      </Box>
      <List>
        <ListItem button component={Link} href="/transaction-history">
          <ListItemIcon>
            <FiDollarSign />
          </ListItemIcon>
          <ListItemText primary="Transaction History" />
        </ListItem>
        <ListItem button component={Link} href="/add-transaction">
          <ListItemIcon>
            <FiDollarSign />
          </ListItemIcon>
          <ListItemText primary="Add Transaction" />
        </ListItem>
        <ListItem>
        {user ? (
            // Show the Logout button if the user is logged in
            <Button color="inherit" onClick={logout} sx={{ marginRight: 1 }}>
              Logout
            </Button>
          ) : (
            // Show the Login button if the user is not logged in
            <Button color="inherit" onClick={login} sx={{ marginRight: 1 }}>
              Login
            </Button>
          )}
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
