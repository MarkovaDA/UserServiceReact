import { combineReducers } from 'redux';
import { itemClickSubscribe }  from './itemClickReducer';
import { callPopupSubscribe } from './callPopupReducer';

export default combineReducers({
  item: itemClickSubscribe,
  issue: callPopupSubscribe
});

