import { baseAPI } from "./http-common";

export class RestService {

  get itemKey() {
    return this._itemKey;
  };

  set itemKey(key) {
    this._itemKey = key;
  }

  async getAll() {
    const response = await baseAPI.get(this.itemKey);
    return response.data;
  }

  async getById(id) {
    const response = await baseAPI.get(this.itemKey, id);
    return response.data;
  }

  async create(data) {
    const response = await baseAPI.post(this.itemKey, data);
    return response.data;
  }

  async update(data) {
    const response = await baseAPI.put(`${this.itemKey}/${data.id}`, data);
    return response.data;
  }

  async delete(id) {
    const response = await baseAPI.delete(`${this.itemKey}/${id}`);
    return response.data;
  }
}