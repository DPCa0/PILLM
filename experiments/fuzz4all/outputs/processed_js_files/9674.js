 

 

 
function* dataGenerator(data) {
  for (let item of data) {
    yield item;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
const dataProxy = new Proxy({ value: 0 }, handler);

 
async function processData(generator, proxy) {
  for (let data of generator) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    proxy.value += data;
    print(`Current value in proxy: ${proxy.value}`);
  }
}

 
const data = [1, 2, 3, 4, 5];
const generator = dataGenerator(data);

processData(generator, dataProxy);
