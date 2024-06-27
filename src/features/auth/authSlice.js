import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mock API calls for authentication
const mockLogin = async (credentials) => {
  const { email, password } = credentials;
  if (email === "user@example.com" && password === "password") {
    return { email };
  } else {
    throw new Error("Invalid credentials");
  }
};

const mockSignup = async (credentials) => {
  const { email, password } = credentials;
  if (email && password) {
    return { email };
  } else {
    throw new Error("Invalid data");
  }
};

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await mockLogin(credentials);
  return response;
});

export const signup = createAsyncThunk("auth/signup", async (credentials) => {
  const response = await mockSignup(credentials);
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    status: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.status = "loggedIn";
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = "loginFailed";
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "signedUp";
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = "signupFailed";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
