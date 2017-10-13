import groupSchema from '../schema/GroupsSchema';
import usersDetailSchema from '../schema/UsersDetailSchema';
import { normalize, denormalize } from 'normalizr';
import { isEmpty } from 'lodash';

class DataLoadService {
  getUserDataRequest() {
     return new Promise((resolve, reject) => {
       fetch('/server/groups.json')
         .then(response => response.json())
         .then(json => {
           //выполняем нормализацию полученной пачки данных от сервера
           const normalizedUsers = normalize(json, groupSchema).entities.users;
           //и извлекаем информацию только о пользователях (остальное на данном этапе не нужно)
           resolve(Object.values(normalizedUsers));
         })
         .catch(error => reject(error))
     });
  }

  getUserDataById(id) {
    return new Promise((resolve, reject) => {
      fetch('/server/description.json')
        .then(response => response.json())
        .then(json => {
          const clickedUser = json.users.find(item => item.id === id);
          //const normalizedUser = denormalize({users: [id]}, usersDetailSchema, json); with normalizer
          resolve(clickedUser);
        })
        .catch(error => reject(error))
    });
  }

  getUserIdsInGroup(groupId) {
    //получаем список айдишников пользователей, входящих в группу groupId
    return new Promise((resolve, reject) => {
      fetch('/server/groups.json')
        .then(response => response.json())
        .then(json => {
          const groups = normalize(json, groupSchema).entities.groups;
          const searchedGroup = Object.values(groups).find(item => item.id === groupId);
          let ids = [];

          if (groupId !== 0) {
            ids = Object.values(searchedGroup.users);
          }

          resolve(ids);
        })
        .catch(error => reject(error))
    });
  }

}

let service = new DataLoadService();
export default service;
