import { useAppSelector } from '../store';

export const useAuth = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const checkAccess = (allowedRoles: string[]) => {
    if (!isAuthenticated) return false;
    return allowedRoles.includes(user.role);
  };

  return {
    isAuthenticated,
    user,
    checkAccess,
  };
};