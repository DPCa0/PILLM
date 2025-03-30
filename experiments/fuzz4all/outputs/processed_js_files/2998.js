class Pipeline {
  constructor(...fns) {
    this.fns = fns;
  }

  async execute(value) {
    for (let fn of this.fns) {
      value = await fn(value);
    }
    return value;
  }
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const fetchUser = async (id) => {
  await delay(500);
  return { id, name: `User${id}` };
};

const fetchPosts = async (user) => {
  await delay(500);
  return { ...user, posts: [`Post1 by ${user.name}`, `Post2 by ${user.name}`] };
};

const addTimestamp = async (data) => {
  await delay(500);
  return { ...data, timestamp: new Date().toISOString() };
};

const pipeline = new Pipeline(fetchUser, fetchPosts, addTimestamp);

(async () => {
  try {
    const result = await pipeline.execute(1);
    print(result);
  } catch (error) {
    console.error('Pipeline failed:', error);
  }
})();
