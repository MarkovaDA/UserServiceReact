export const loadUserInfoSubscribe = (state = {isFetching: false, userDetails: []}, action) => {
  switch(action.type) {
    case 'USER_DETAIL_REQUEST':
      return {...state,
        isFetching: true
      };
    case 'USER_DETAIL_REQUEST_SUCCESS':
      console.log('USER_DETAIL_REQUEST_SUCCESS');
      const userInfo = action.userInfo;
      return {...state,
        isFetching:false,
        userDetails:[...state.userDetails, userInfo]
      };
    case 'USER_DETAIL_REQUEST_FAILURE':
      console.log('USER_DETAIL_REQUEST_FAILURE');
      return {...state,
        isFetching:false,
        error: action.error
      };
    case 'USER_HAS_FOUND_IN_CACHE':
      console.log('USER_HAS_FOUND_IN_CACHE');
      return {...state,
        clickedUserInfo: action.clickedUserInfo
      };
    default:
      return {...state}
  }
};