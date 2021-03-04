import axios from "axios";
import { URL_BASE } from './api_consts';

export default axios.create({
  baseURL: URL_BASE,
  headers: {
    "Content-type": "application/json"
  }
});