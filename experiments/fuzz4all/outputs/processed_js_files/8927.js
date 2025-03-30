 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: "Hello, advanced JavaScript!" });
    }, 1000);
  });
}

const handler = {
  get: (target, prop, receiver) => {
    print(`Getting ${prop} from target`);
    return Reflect.get(...arguments);
  },
  set: (target, prop, value, receiver) => {
    print(`Setting ${prop} to ${value} in target`);
    return Reflect.set(...arguments);
  }
};

const createAsyncProxy = async () => {
  const data = await fetchData();
  const targetObject = { message: data.data };
  
  return new Proxy(targetObject, handler);
};

(async function() {
  const proxy = await createAsyncProxy();
  print(proxy.message);  
  proxy.message = "Modified message";  
  print(proxy.message);
})();
