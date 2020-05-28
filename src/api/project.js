import { ApiURL } from './constant.js';
import Http from './httpHelp';

export const list = () =>
  Http({
    url: ApiURL.project,
  });

export const update = (data) =>
  Http({
    url: `${ApiURL.project}/${data.id}`,
    method: 'patch',
    data,
  });

export const create = (data) =>
  Http({
    url: ApiURL.project,
    method: 'post',
    data,
  });

export const del = (id) =>
  Http({
    url: `${ApiURL.project}/${id}`,
    method: 'delete',
  });
