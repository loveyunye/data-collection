let BaseURL;

if (process && process.env && process.env.NODE_ENV === 'dev') {
  BaseURL = 'http://localhost:3030/api';
} else {
  BaseURL = '/api';
}

const ApiURL = {
  dataSource: '/dataSource',
  apiSource: '/apiSource',
  compose: '/compose',
  project: '/project',
  user: '/user',
  login: '/login',
  logout: '/logout',
};

const dbType = {
  MySQL: 'mysql',
};

const apiType = [
  {
    name: '数据库',
    value: 'sql',
  },
  {
    name: '静态数据',
    value: 'static',
  },
  {
    name: 'URI',
    value: 'url',
  },
];
export { BaseURL, ApiURL, dbType, apiType };
