import { filter, includes, isEmpty } from 'lodash';

export const loadDataSubscribe = (state, action) => {
  switch(action.type) {
    case 'USERS_DATA_REQUEST':
      console.log('USERS_DATA_REQUEST');
      return {...state,
        isFetching: true
      };
    case 'USERS_DATA_REQUEST_SUCCESS':
      //получение данных о пользователе с сервера
      return Object.assign({}, state, {
        isFetching: false,
        items: action.results,
        allItems: action.results
      });
    case 'USERS_DATA_REQUEST_FAILURE':
      console.log('USERS_DATA_REQUEST_FAILURE');
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case 'FILTER_USER_REQUEST_SUCCESS':
      //фильтрация пользователей по группам
      console.log('FILTER_USER_REQUEST_SUCCESS');
      const ids = action.results; //id-шники пользователей, входящих в выбранную группу
      const sourceItems = state.allItems;
      let filteredItems = sourceItems;
      if (!isEmpty(ids))
        filteredItems = filter(sourceItems, (item) => { return includes(ids, item.id) });
      return {...state,
        items: filteredItems
      };
    case 'FILTER_USER_REQUEST_FAILURE':
      console.log('FILTER_USER_REQUEST_FAILURE');
      return {...state};
    default:
      return {...state};
  }
};

