import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import launchesReducer from "./features/launches/launchesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    launches: launchesReducer,
  },
});

export default store;
