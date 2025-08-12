import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default MainLayout;