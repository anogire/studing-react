//import { usersAPI as api } from "../../new_store/api-connect/http-common";
import { USERS } from '../../new_store/api-connect/api_consts';

class DataService {
  getAll() {
    return api.get(USERS);
  }

  get(id) {
    return api.get(`${USERS}/${id}`);
  }

  create(data) {
    return api.post(USERS, data);
  }

  update(id, data) {
    return api.put(`${USERS}/${id}`, data);
  }

  delete(id) {
    return api.delete(`${USERS}/${id}`);
  }
}

export default new DataService();