 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
};

 
const loggerProxy = (obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      print(`Accessed property "${prop}"`);
      return target[prop];
    },
    set(target, prop, value) {
      print(`Set property "${prop}" to ${value}`);
      target[prop] = value;
      return true;
    }
  });
};

 
const privateData = Symbol('privateData');

 
class DataHandler {
  constructor() {
    this[privateData] = {};
    this.data = loggerProxy(this[privateData]);
  }

  async loadData(url) {
    this.data.url = url;
    this.data.content = await fetchData(url);
  }

  get content() {
    return this.data.content;
  }
}

 
(async () => {
  const handler = new DataHandler();
  await handler.loadData('https://api.example.com');
  print(handler.content);
})();
