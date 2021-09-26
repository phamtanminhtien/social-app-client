import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export const userSlice = createSlice({
  name: "user",
  initialState: { value: { userInfo: null, is_loading: false } },
  reducers: {
    empty: () => {},
    login: (state, action) => {
      state.value = {
        userInfo: action.payload,
        is_loading: false,
      };
    },
    logout: (state) => {
      state.value = {
        userInfo: null,
        is_loading: false,
      };
    },
    startLoading: (state) => {
      state.value = { ...state.value, is_loading: true };
    },
    stopLoading: (state) => {
      state.value = { ...state.value, is_loading: false };
    },
  },
});

export const login = (token) => {
  localStorage.setItem("token", token);

  try {
    const decoded = jwtDecode(localStorage.getItem("token"));
    if (decoded) {
      if (Date.now() < decoded.exp * 1000) {
        return userSlice.actions.login(decoded);
      } else {
        return userSlice.actions.empty();
      }
    }
  } catch (error) {
    localStorage.removeItem("token");
    return logout();
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  return userSlice.actions.logout();
};

export const { startLoading, stopLoading } = userSlice.actions;
export const userSelect = (state) => state.user.value.userInfo;
export const loadingSelect = (state) => state.user.value.is_loading;

export default userSlice.reducer;
