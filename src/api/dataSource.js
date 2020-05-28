import { ApiURL } from './constant.js';
import Http from './httpHelp';

export const list = (data = {}) =>
  Http({
    url: ApiURL.dataSource,
    data,
  });

export const update = (data) =>
  Http({
    url: `${ApiURL.dataSource}/${data.id}`,
    method: 'patch',
    data,
  });

export const create = (data) =>
  Http({
    url: ApiURL.dataSource,
    method: 'post',
    data,
  });

export const del = (id) =>
  Http({
    url: `${ApiURL.dataSource}/${id}`,
    method: 'delete',
  });

export const test = (data) =>
  Http({
    url: `${ApiURL.dataSource}/test`,
    method: 'post',
    data,
  });
