import { ApiURL } from './constant.js';
import Http from './httpHelp';

export const list = (data = {}) =>
  Http({
    url: ApiURL.apiSource,
    data,
  });

export const update = (data) =>
  Http({
    url: `${ApiURL.apiSource}/${data.id}`,
    method: 'patch',
    data,
  });

export const create = (data) =>
  Http({
    url: ApiURL.apiSource,
    method: 'post',
    data,
  });

export const del = (id) =>
  Http({
    url: `${ApiURL.apiSource}/${id}`,
    method: 'delete',
  });

export const test = (data) =>
  Http({
    url: `${ApiURL.apiSource}/test`,
    method: 'post',
    data,
  });
