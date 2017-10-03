export const loadUserInfoSubscribe = (state, action) => {
  switch(action.type) {
    case 'USER_BY_ID_REQUEST':
      return {...state,
        isFetching: true
      };
    case 'USER_BY_ID_REQUEST_SUCCESS':
      return {...state,
        isFetching: false,
        info: action.userInfo
      };
    case 'USER_BY_ID_REQUEST_FAILURE':
      return {...state,
        isFetching:false,
        error: action.error
      };
    default:
      return {...state}
  }
};