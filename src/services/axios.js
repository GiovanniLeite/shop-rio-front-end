import axios from 'axios';
import api_url from '../config/api';

export default axios.create({
  baseURL: api_url,
});
