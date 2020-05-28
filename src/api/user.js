import { ApiURL } from './constant.js';
import Http from './httpHelp';

export const login = (data = {}) =>
  Http({
    url: ApiURL.login,
    method: 'post',
    data,
  });

export const logout = (data = {}) =>
  Http({
    url: ApiURL.logout,
    method: 'post',
    data,
  });

export const findSelf = (data = {}) =>
  Http({
    url: ApiURL.user,
    data,
  });

export const update = (data) =>
  Http({
    url: `${ApiURL.user}/${data.id}`,
    method: 'patch',
    data,
  });

export const create = (data) =>
  Http({
    url: ApiURL.user,
    method: 'post',
    data,
  });

export const del = (id) =>
  Http({
    url: `${ApiURL.user}/${id}`,
    method: 'delete',
  });
