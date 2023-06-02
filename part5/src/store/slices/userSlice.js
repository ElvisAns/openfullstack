import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

function getInitVal() {
  const init = localStorage.getItem("userAuth");
  if (init) {
    axios.defaults.headers.common = { Authorization: `Bearer ${JSON.parse(init).token}` }
    return JSON.parse(init);
  }
  return {};
}

export const userSlice = createSlice({
  name: "userStore",
  initialState: {
    userInfo: getInitVal(),
  },
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userAuth", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = {};
      localStorage.removeItem("userAuth");
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
