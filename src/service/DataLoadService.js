import groupSchema from '../schema/GroupsSchema';
import usersDetailSchema from '../schema/UsersDetailSchema';
import { normalize, denormalize } from 'normalizr';

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
          const clickedUser = json.users.find((item) => {return item.id === id});
          //const normalizedUser = denormalize({users: [id]}, usersDetailSchema, json); with normalizer
          resolve(clickedUser);
        })
        .catch(error => reject(error))
    });
  }

  getUserDetailsSchema() {
    return new Promise((resolve, reject) => {
      fetch('/server/description.json')
        .then(response => response.json())
        .then(json => {
          const details = normalize(json, usersDetailSchema);
          resolve(details);
        })
        .catch(error => reject(error))
    });
  }
}

let service = new DataLoadService();
export default service;
