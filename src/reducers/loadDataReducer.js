//import { DataLoadService} from "../service/DataLoadService";
import userService from "../service/DataLoadService";
export const loadDataSubscribe = (state = {}, action) => {

  switch(action.type) {
    case 'LOAD_DATA':
      userService.getUserDataRequest()
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          //console.log(responseJson);
          return  {...state, items: responseJson};
        })
        .catch((error) => {
          return {...state, error: error}
        });
    default:
      return {...state};
  }
};

