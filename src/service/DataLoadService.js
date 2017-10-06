
class DataLoadService {
  getUserDataRequest() {
     return fetch('/server/groups.json');
  }

  getUserDataById(id) {
    return new Promise((resolve, reject) => {
      fetch('/server/description.json')
        .then(response => response.json())
        .then(json => {
          //имитация обработки на сервере:извлечение описание по id из json
          const data = json.filter(item => item.id === id).shift();
          resolve(data);
        })
        .catch(error => reject(error))
    });
  }
  getGroupData() {
    return fetch('/server/groups.json');
  }
}

let service = new DataLoadService();
export default service;
