import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

interface UserState {
  logged: boolean;
}

const initialState: UserState = {
  logged: false,
};

export const login = createAsyncThunk(
  "user/login",
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);
    const { data } = await axios.post(
      "http://localhost:3000/api/log/in",
      objData
    );
    return data;
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(login.fulfilled, (state, action) => {
    state.logged = true;
  });
});

export default userReducer;
