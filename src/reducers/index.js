import { combineReducers } from 'redux';
import { loadDataSubscribe } from "./loadDataReducer";

export default combineReducers({
  data: loadDataSubscribe
});

