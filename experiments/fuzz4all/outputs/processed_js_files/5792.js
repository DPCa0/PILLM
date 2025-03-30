 

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const asyncGenerator = async function* () {
  const items = [Symbol('item1'), Symbol('item2'), Symbol('item3')];
  for (const item of items) {
    await delay(1000);
    yield item;
  }
};

const target = {
  _secret: 'topSecret',
  fetchData: async () => {
    return await delay(500).then(() => ({ data: 'important data' }));
  },
};

const handler = {
  get: (obj, prop) => {
    if (prop === 'secret') {
      return `Access Denied: ${obj._secret}`;
    }
    return obj[prop];
  },
};

const proxiedTarget = new Proxy(target, handler);

(async () => {
  print(proxiedTarget.secret);  
  print(await proxiedTarget.fetchData());  

  const gen = asyncGenerator();
  for await (const item of gen) {
    print(`Yielded: ${item.toString()}`);
  }
})();
