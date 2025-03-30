 

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async () => {
  await delay(1000);
  return { data: 'Hello, World!' };
};

const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return Reflect.get(target, prop, receiver);
    } else {
      console.warn(`Property ${prop} does not exist on target`);
    }
  },
  set: (target, prop, value, receiver) => {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const proxyObject = new Proxy({ message: 'Initial Message' }, handler);

const main = async () => {
  print('Fetching data...');
  let data = await fetchData();
  proxyObject.message = data.data;
  print(proxyObject.message);
};

main();
