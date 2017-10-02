class DataLoadService {
  getUserDataRequest() {
     return fetch('/server/users.json');
  }
};
let service = new DataLoadService();
export default service;
/*export { DataLoadService };*/