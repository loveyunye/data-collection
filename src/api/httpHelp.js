import axios from 'axios';
import { Message } from 'element-ui';
import { BaseURL } from './constant';

const instance = axios.create({
  baseURL: BaseURL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, message = '' } = error.response.data;
    return Promise.reject(new Error(`${status} : ${message}`));
  },
);

async function Api(config = {}) {
  const { data = {}, method = 'get', url } = config;
  const opt = {
    url,
    method,
  };
  method === 'get' ? (opt.params = data) : (opt.data = data);
  try {
    const res = await instance.request(opt);
    return res.data;
  } catch (error) {
    Message.error(error.message);
    throw error;
  }
}

export default Api;
