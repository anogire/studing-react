import api from "../actions/http-common";

class DataService {
  getAll(param) {
    return api.get(param);
  }

  get(param, id) {
    return api.get(`${param}/${id}`);
  }

  create(param, data) {
    return api.post(param, data);
  }

  update(param, id, data) {
    return api.put(`${param}/${id}`, data);
  }

  delete(param, id) {
    return api.delete(`${param}/${id}`);
  }
}

export default new DataService();