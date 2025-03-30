 
const fetchData = async function* (urls) {
  for (const url of urls) {
    yield await new Promise((resolve) => setTimeout(() => resolve(`Data from ${url}`), 1000));
  }
};

const targetObject = {
  async *getData(urls) {
    for await (let data of fetchData(urls)) {
      yield data;
    }
  },
};

const handler = {
  get(target, property, receiver) {
    if (property === Symbol.iterator) {
      return Reflect.get(target, 'getData', receiver);
    }
    return Reflect.get(...arguments);
  },
};

const proxy = new Proxy(targetObject, handler);

(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  for await (let data of proxy.getData(urls)) {
    print(data);
  }
})();
