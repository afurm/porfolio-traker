import React from 'react';
import Link from 'next/link';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FiHome, FiBarChart2, FiDollarSign, FiSettings } from 'react-icons/fi';

const Sidebar: React.FC = () => {
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
        <Link href="/dashboard" passHref>
          <ListItem button component="a">
            <ListItemIcon>
              <FiHome />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link href="/analytics" passHref>
          <ListItem button component="a">
            <ListItemIcon>
              <FiBarChart2 />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>
        </Link>
        <Link href="/assets" passHref>
          <ListItem button component="a">
            <ListItemIcon>
              <FiDollarSign />
            </ListItemIcon>
            <ListItemText primary="Assets" />
          </ListItem>
        </Link>
        <Link href="/settings" passHref>
          <ListItem button component="a">
            <ListItemIcon>
              <FiSettings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </Link>
      </List>
    </Box>
  );
};

export default Sidebar;
