import { combineReducers } from "redux";
import { reducer as users } from "./root";
import { reducer as albums } from "./root";

export default combineReducers({
  users,
  albums
});