import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../utils/axios';

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async ({ username, password }) => {
    try {
      const { data } = await axios.post('/auth/register', { username, password });

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async ({ username, password }) => {
  try {
    const { data } = await axios.post('/auth/login', { username, password });

    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const { data } = await axios.get('/auth/me');

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    status: null,
  },
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },

  extraReducers: (builder) => {
    builder
      //register
      .addCase(fetchRegister.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
      })
      ///login

      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
      })

      //getMe
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = null;
        state.token = action.payload?.token;
        state.user = action.payload?.user;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.message;
      });
  },
});

export const checkIsAuth = (state) => !!state.auth.token;

export const { logOut } = authSlice.actions
export default authSlice.reducer;
