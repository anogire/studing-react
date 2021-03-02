import axios from "axios";
import { URL_USERS } from './api_consts';

export default axios.create({
  baseURL: URL_USERS,
  headers: {
    "Content-type": "application/json"
  }
});