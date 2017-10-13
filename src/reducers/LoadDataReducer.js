
export const loadDataSubscribe = (state, action) => {
  switch(action.type) {
    case 'USERS_DATA_REQUEST':
      console.log('USERS_DATA_REQUEST');

      return {...state,
        isFetching: true
      };
    case 'USERS_DATA_REQUEST_SUCCESS':
      console.log('USERS_DATA_REQUEST_SUCCESS');

      return {...state,
        isFetching: false,
        items: action.results,
        allItems: action.results
      };
    case 'USERS_DATA_REQUEST_FAILURE':
      console.log('USERS_DATA_REQUEST_FAILURE');

      return {...state,
        isFetching: false,
        error: action.error
      };
    default:
      return {...state};
  }
};

