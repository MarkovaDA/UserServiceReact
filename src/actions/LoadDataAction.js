import userService from "../service/DataLoadService";
import find from 'lodash/find';
import omit from 'lodash/omit';

export const loadUserInfoByIdAction = (id) => {
  return (dispatch) => {
    return {
      type: 'USER_BY_ID_REQUEST',
      result:
        userService.getUserById()
          .then(response => response.json())
          .then(json => {
            const info = omit(find(json, {'id': id}), 'id');
            dispatch(receiveUserInfoSuccess(info))
          })
          .catch(error => dispatch(receiveUserInfoFailure(error)))
    }
  }
};

export const loadUsersDataAction = () => {
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
export const receiveUserInfoSuccess = (info) => {
  return {
    type: 'USER_BY_ID_REQUEST_SUCCESS',
    userInfo: info
  };
};

export const receiveDataSuccess = (json) => {
  return {
    type: 'USERS_DATA_REQUEST_SUCCESS',
    results: json
  };
};

export const receiveUserInfoFailure = (error) => {
  return {
    type: 'USER_BY_ID_REQUEST_FAILURE',
    error: error
  };
};

export const receiveDataFailure = (error) => {
  return {
    type: 'USERS_DATA_REQUEST_FAILURE',
    error: error
  };
};