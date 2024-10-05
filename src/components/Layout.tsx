import React from 'react';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box component="main" flex={1} p={4}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;