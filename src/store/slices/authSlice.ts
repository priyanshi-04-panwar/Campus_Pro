import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserRole = 'student' | 'recruiter' | 'admin' | null;

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string | null;
    email: string | null;
    role: UserRole;
    name: string | null;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: null,
    email: null,
    role: null,
    name: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{
      id: string;
      email: string;
      role: UserRole;
      name: string;
    }>) => {
      const { id, email, role, name } = action.payload;
      state.isAuthenticated = true;
      state.user = { id, email, role, name };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = initialState.user;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;