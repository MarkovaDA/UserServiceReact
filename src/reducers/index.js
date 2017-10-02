import { combineReducers } from 'redux';
import { itemClickSubscribe }  from './itemClickReducer';
import { callPopupSubscribe } from './callPopupReducer';
import { loadDataSubscribe } from "./loadDataReducer";

export default combineReducers({
  //item: itemClickSubscribe,
  //issue: callPopupSubscribe,
  data: loadDataSubscribe
});

