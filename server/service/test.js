const MongoClient = require('./mongo');
const client = new MongoClient({
  host: 'www.xujsp.com',
  port: 27017,
  database: 'connect_test',
  username: 'alterman',
  password: '123456',
});
// const client = new MongoClient({
//   host: '47.102.192.173',
//   port: 27017,
//   database: 'data_collection',
//   username: 'root',
//   password: 'pwd',
// });
client.connect().then((res) => {
  console.log(res);
});
