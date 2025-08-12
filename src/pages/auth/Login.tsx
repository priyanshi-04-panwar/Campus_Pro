import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch } from '../../store';
import { setCredentials } from '../../store/slices/authSlice';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  role: yup.string().required('Role is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // TODO: Implement actual login API call
        // Mock successful login
        const mockUser = {
          id: '1',
          email: values.email,
          role: values.role,
          name: 'Test User',
        };
        
        dispatch(setCredentials(mockUser));
        
        // Redirect based on role
        switch (values.role) {
          case 'student':
            navigate('/student/dashboard');
            break;
          case 'recruiter':
            navigate('/recruiter/dashboard');
            break;
          case 'admin':
            navigate('/admin/dashboard');
            break;
          default:
            navigate('/');
        }
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Login to Campus Pro
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              id="email"
              name="email"
              label="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formik.values.role}
                label="Role"
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="recruiter">Recruiter</MenuItem>
                <MenuItem value="admin">Admin/TPO</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate('/signup')}
            >
              Don't have an account? Sign Up
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;