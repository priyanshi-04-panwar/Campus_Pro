import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import StudentDashboard from '../pages/student/Dashboard';
import RecruiterDashboard from '../pages/recruiter/Dashboard';
import AdminDashboard from '../pages/admin/Dashboard';
import { useAuth } from '../hooks/useAuth';

// Protected route wrapper
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { isAuthenticated, checkAccess } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!checkAccess(allowedRoles)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/login" replace />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/student/*',
        element: (
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/recruiter/*',
        element: (
          <ProtectedRoute allowedRoles={['recruiter']}>
            <RecruiterDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/*',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);