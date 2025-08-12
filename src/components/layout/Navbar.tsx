import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../store';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAuth();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getNavLinks = () => {
    if (!isAuthenticated) {
      return (
        <>
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button color="inherit" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </>
      );
    }

    switch (user.role) {
      case 'student':
        return (
          <Button color="inherit" onClick={() => navigate('/student')}>
            Dashboard
          </Button>
        );
      case 'recruiter':
        return (
          <Button color="inherit" onClick={() => navigate('/recruiter')}>
            Dashboard
          </Button>
        );
      case 'admin':
        return (
          <Button color="inherit" onClick={() => navigate('/admin')}>
            Dashboard
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          <Typography variant="h6" component="div">
            Campus Pro
          </Typography>
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        {getNavLinks()}

        {isAuthenticated && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;