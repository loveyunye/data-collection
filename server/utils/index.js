/**
 * 生成uuid, 为了避免重复key，加上时间戳
 * @param {int} length 长度
 */
function getUuid(length = 24) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  for (let i = 0; i < length; i++) {
    uuid.push(chars[Math.floor((1 - Math.random()) * chars.length)]);
  }
  return uuid.join('');
}

module.exports = {
  getUuid,
};
