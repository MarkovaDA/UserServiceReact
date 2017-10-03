class DataLoadService {
  getUserDataRequest() {
     return fetch('/server/users.json');
  }
  getUserById() {
    return fetch('/server/description.json');
  }
};
let service = new DataLoadService();
export default service;
/*export { DataLoadService };*/