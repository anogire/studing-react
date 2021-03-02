import api from "../actions/http-common";

class DataService {
  getAll() {
    return api.get();
  }

  get(id) {
    return api.get(`/${id}`);
  }

  create(data) {
    return api.post('', data);
  }

  update(id, data) {
    return api.put(`/${id}`, data);
  }

  delete(id) {
    return api.delete(`/${id}`);
  }
}

export default new DataService();