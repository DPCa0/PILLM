class API {
  static #secretKey = Symbol('secretKey');

  constructor(data) {
    this.data = data;
  }

  async fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.data), 1000);
    });
  }

  static authenticate(key) {
    if (key === API.#secretKey) {
      return new API(['user1', 'user2', 'user3']);
    }
    throw new Error('Unauthorized');
  }
}

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

async function processData(api) {
  let ids = idGenerator();
  for await (const item of api.fetchData()) {
    print(`Processing ${item} with ID ${ids.next().value}`);
  }
}

(async () => {
  try {
    const apiInstance = API.authenticate(Symbol('secretKey'));  
    await processData(apiInstance);
  } catch (error) {
    console.error(error.message);
  }
})();
