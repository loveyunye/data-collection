import { ApiURL } from './constant.js';
import Http from './httpHelp';

export const list = (data = {}) =>
  Http({
    url: ApiURL.compose,
    data,
  });

export const update = (data) =>
  Http({
    url: `${ApiURL.compose}/${data.id}`,
    method: 'patch',
    data,
  });

export const create = (data) =>
  Http({
    url: ApiURL.compose,
    method: 'post',
    data,
  });

export const del = (id) =>
  Http({
    url: `${ApiURL.compose}/${id}`,
    method: 'delete',
  });

export const test = (data) =>
  Http({
    url: `${ApiURL.compose}/test`,
    method: 'post',
    data,
  });
