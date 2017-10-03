export const loadDataSubscribe = (state, action) => {
  switch(action.type) {
    case 'USER_BY_ID_REQUEST':
      return {...state,
        isFetching: true
      };
    case 'USER_BY_ID_REQUEST_SUCCESS':
      return {...state,
        isFetching: false,
        userInfo: action.userInfo
      };
    case 'USER_BY_ID_REQUEST_FAILURE':
      return {...state,
        isFetching:false,
        error: action.error
      };
    case 'USERS_DATA_REQUEST':
      console.log('USERS_DATA_REQUEST');
      return {...state,
        isFetching: true
      };
    case 'USERS_DATA_REQUEST_SUCCESS':
      console.log('USERS_DATA_REQUEST_SUCCESS');
      return Object.assign({}, state, {
        isFetching: false,
        items: action.results
      });
    case 'USERS_DATA_REQUEST_FAILURE':
      console.log('USERS_DATA_REQUEST_FAILURE');
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      console.log('DEFAULT');
      return {...state};
  }
};

