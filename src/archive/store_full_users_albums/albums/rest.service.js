//import { usersAPI as api } from "../../new_store/api-connect/http-common";
import { ALBUMS } from '../../new_store/api-connect/api_consts';

class DataService {
  getAll() {
    return api.get(ALBUMS);
  }

  get(id) {
    return api.get(`${ALBUMS}/${id}`);
  }

  create(data) {
    return api.post(ALBUMS, data);
  }

  update(id, data) {
    return api.put(`${ALBUMS}/${id}`, data);
  }

  delete(id) {
    return api.delete(`${ALBUMS}/${id}`);
  }
}

export default new DataService();