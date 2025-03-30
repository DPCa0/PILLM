 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: 'Fetched Data' }), 1000);
  });
};

 
function* dataGenerator() {
  yield fetchData();
  yield fetchData();
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    } else {
      return `Property ${prop} does not exist`;
    }
  },
  set: (target, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

 
const dataObject = { data1: null, data2: null };

 
const proxiedData = new Proxy(dataObject, handler);

 
(async function main() {
  const generator = dataGenerator();

  for (let dataPromise of generator) {
    const data = await dataPromise;
    print(data);

    proxiedData.data1 = data.data;
    print(proxiedData.data1);

    proxiedData.data2 = 'Another Data';
    print(proxiedData.data2);
  }
})();
