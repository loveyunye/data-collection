class RedisSession {
  constructor(client) {
    this.client = client;
  }
  static getRedisSessionId(sid) {
    return `sid:${sid}`;
  }

  async get(sid) {
    const id = RedisSession.getRedisSessionId(sid);
    const data = await this.client.get(id);
    if (!data) {
      return null;
    }
    const result = JSON.parse(data);
    return result;
  }

  async set(sid, sess) {
    const id = RedisSession.getRedisSessionId(sid);
    const sessStr = JSON.stringify(sess);
    await this.client.set(id, sessStr);
  }

  async destroy(sid) {
    const id = RedisSession.getRedisSessionId(sid);
    this.client.del(id);
  }
}

module.exports = RedisSession;
