import axios from 'axios';
import {BASE_URL} from './constants';
import {reset} from './RootNavigation';
import {removeItem} from '../../storage';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      console.log('API REQUEST MESSAGE', response);
      return response.data;
    } else {
      const message = response.data?.message;
      console.log('API REQUEST MESSAGE', response);
      if (!response.data?.auth) {
        reset(0, 'Login');
        removeApiToken();
        removeItem('accessToken');
      }
      return Promise.reject(message);
    }
  },
  async function (error) {
    let message;
    if (error.response) {
      if (error.response.status === 401) {
        removeApiToken();
      }
      message = error.response.data?.message || error?.message;
    } else {
      message = error.message;
    }
    return Promise.reject(message);
  },
);

export const setApiToken = (AUTH_TOKEN: string) => {
  return (axiosInstance.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`);
};

export const removeApiToken = () => {
  return (axiosInstance.defaults.headers.common.Authorization = '');
};

// ----------All Api Request -----------//
export async function getApi(url: string) {
  return await axiosInstance.get(`${url}`);
}

export async function getApiWithParam(url: string, param: any) {
  return axiosInstance.get(url, {
    params: param,
  });
}

export async function postApi(url: string, payload: any) {
  return await axiosInstance.post(`${url}`, payload);
}

export async function putApi(url: string, payload: any) {
  return await axiosInstance.put(`${url}`, payload);
}
export async function postApiWithHeader(
  url: string,
  payload: any,
  header: any,
) {
  return await axiosInstance.post(`${url}`, payload, {headers: header});
}
