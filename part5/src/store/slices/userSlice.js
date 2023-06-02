import { createSlice } from "@reduxjs/toolkit";

function getInitVal() {
  const init = localStorage.getItem("userAuth");
  if (init) {
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
