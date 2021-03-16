import { combineReducers } from "redux";
import auth from "./Auth";

export default combineReducers({
  authState: auth,
});
