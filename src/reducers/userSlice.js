import { createSlice } from "@reduxjs/toolkit";

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
    changeAvatar: (state, action) => {
      const newUserInfo = { ...state.value.userInfo, avatar: action.payload };
      state.value = { ...state.value, userInfo: newUserInfo };
    },
  },
});

export const logout = () => {
  localStorage.removeItem("token");
  return userSlice.actions.logout();
};

export const { startLoading, stopLoading, empty, login, changeAvatar } =
  userSlice.actions;
export const userSelect = (state) => state.user.value.userInfo;
export const loadingSelect = (state) => state.user.value.is_loading;

export default userSlice.reducer;
