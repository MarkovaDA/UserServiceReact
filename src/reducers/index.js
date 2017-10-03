import { combineReducers } from 'redux';
import { loadDataSubscribe } from "./LoadDataReducer";
import { loadUserInfoSubscribe } from "./LoadUserInfoReducer";

export default combineReducers({
  usersData: loadDataSubscribe,
  selectedUser: loadUserInfoSubscribe
});

