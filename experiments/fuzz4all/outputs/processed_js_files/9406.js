 
const fetchData = url =>
  new Promise((resolve, reject) =>
    setTimeout(() => (url ? resolve(`Data from ${url}`) : reject('No URL provided')), 1000)
  );

const proxyHandler = {
  get(target, property, receiver) {
    if (property in target) {
      print(`Accessing property ${property}`);
      return Reflect.get(target, property, receiver);
    } else {
      print(`Property ${property} doesn't exist`);
      return undefined;
    }
  },
};

const asyncGenerator = async function* (urls) {
  for (const url of urls) {
    try {
      const data = await fetchData(url);
      yield data;
    } catch (error) {
      yield `Error: ${error}`;
    }
  }
};

(async () => {
  const target = { valid: 'This is valid data' };
  const proxy = new Proxy(target, proxyHandler);

  const urls = ['http: 
  const dataGenerator = asyncGenerator(urls);

  for await (const data of dataGenerator) {
    print(`Received: ${data}`);
  }

  print(proxy.valid);
  print(proxy.invalid);
})();
