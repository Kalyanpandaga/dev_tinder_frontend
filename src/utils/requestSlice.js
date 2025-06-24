import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addConnectionRequests: (state, action) => {
      return action.payload;
    },
    removeConnectionRequests: () => null,
  },
});

export const { addConnectionRequests, removeConnectionRequests } =
  requestSlice.actions;
export default requestSlice.reducer;
