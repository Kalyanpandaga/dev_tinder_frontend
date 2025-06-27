import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

const appReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  connections: connectionReducer,
  connectionRequests: requestReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }
  return appReducer(state, action);
};

const appStore = configureStore({
  reducer: rootReducer,
});

export default appStore;
