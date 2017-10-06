import groupSchema from '../schema/GroupsSchema';
import { normalize } from 'normalizr';

class DataLoadService {
  getUserDataRequest() {
     return new Promise((resolve, reject) => {
       fetch('/server/groups.json')
         .then(response => response.json())
         .then(json => {
           const normalizedUsers = normalize(json, groupSchema).entities.users;
           //console.log(Object.values(normalizedUsers));
           resolve(Object.values(normalizedUsers));
         })
         .catch(error => reject(error))
     });
  }

  getUserDataById(id) {
    return new Promise((resolve, reject) => {
      fetch('/server/groups.json')
        .then(response => response.json())
        .then(json => {
          const workplaces = normalize(json, groupSchema).entities.workplace;
          const data = {data: Object.values(workplaces).find(item => {return item.id === id})};
          resolve(data);
        })
        .catch(error => reject(error))
    });
  }

  getTotalDescription() {
    return new Promise((resolve, reject) => {
      fetch('/server/description.json')
        .then(response => response.json())
        .then(json => {
          resolve(json);
        })
        .catch(error => reject(error))
    });
  }
}

let service = new DataLoadService();
export default service;
