import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  auth: authReducer,
  // errors: errorReducer,
  profile: profileReducer
});
