import userService from '../service/DataLoadService';

export const loadUsersData = () => {
  return (dispatch) => {
    return {
      type: 'USERS_DATA_REQUEST',
      result:
        userService.getUserDataRequest()
          .then(response => response.json())
          .then(json => dispatch(receiveDataSuccess(json)))
          .catch(error => dispatch(receiveDataFailure(error)))
    }
  }
};

export const loadUserDataIsNeed = (id) => {
  return(dispatch, getState) => {
    const foundUser = getState().selectedUser.userDetails.find(user => user.id === id);

    if (foundUser) {
      console.log('there is cashed data');
      dispatch(extractCachedUserInfo(foundUser));
      return;
    }

    return {
      type: 'USER_DETAIL_REQUEST',
      result: userService.getUserDataById(id)
        .then((data) => {
          dispatch(receiveUserInfoSuccess(data))
        }, (error) => {
          dispatch(receiveUserInfoFailure(error))
        })
    }
  }
};
const extractCachedUserInfo = (info) => {
  return {
    type: 'USER_HAS_FOUND_IN_CACHE',
    clickedUserInfo: info
  }
};

const receiveUserInfoFailure = (error) => {
  return {
    type: 'USER_DETAIL_REQUEST_FAILURE',
    error: error
  };
};
//отправить user_has_found_in_cache
const receiveUserInfoSuccess = (info) => {
  return {
    type: 'USER_DETAIL_REQUEST_SUCCESS',
    userInfo: info
  };
};

const receiveDataSuccess = (json) => {
  return {
    type: 'USERS_DATA_REQUEST_SUCCESS',
    results: json
  };
};

const receiveDataFailure = (error) => {
  return {
    type: 'USERS_DATA_REQUEST_FAILURE',
    error: error
  };
};