import userService from '../service/DataLoadService';

export const filterUsersByGroup = (groupId) => {
  return (dispatch) => {
    //TODO: if groupId === 0 то отправить отдельный экшен
    //TODO: кеширование (с помощью reselect, возможно)
    return {
      result:
        userService.getUserIdsInGroup(groupId)
          .then((data) => {
            dispatch(receiveFilterUsersSuccess(data))
          }, (error) => {
            dispatch(receiveFilterUsersFailure(error))
          })
    }
  }
};

const receiveFilterUsersSuccess = (ids) => {
  return {
    type: 'FILTER_USER_REQUEST_SUCCESS',
    results: ids
  };
};

const receiveFilterUsersFailure = (error) => {
  return {
    type: 'FILTER_USER_REQUEST_FAILURE',
    error: error
  };
};