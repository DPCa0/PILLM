 
async function* fetchDataSequence() {
  const data = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig'];
  for (const item of data) {
    await new Promise(resolve => setTimeout(resolve, 500));  
    yield item;
  }
}

 
const target = {
  fruits: [],
  message: 'Data loading complete!'
};

const handler = {
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

 
(async function() {
  print('Fetching data...');
  for await (const fruit of fetchDataSequence()) {
    proxy.fruits = [...proxy.fruits, fruit];
    print(`Current fruits: ${proxy.fruits.join(', ')}`);
  }
  
  const { message } = proxy;
  print(`Message: ${message}`);
})();
