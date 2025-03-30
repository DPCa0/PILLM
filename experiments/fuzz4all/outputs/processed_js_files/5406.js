 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* generateNumbers() {
  let i = 0;
  while (true) {
    await delay(500);
    yield i++;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    const result = Reflect.set(...arguments);
    if (result) notify();
    return result;
  }
};

 
const notify = () => print('Value changed!');

 
const reactiveObject = new Proxy({ value: 0 }, handler);

 
async function updateValues() {
  for await (let num of generateNumbers()) {
    reactiveObject.value = num;
    if (num >= 5) break;
  }
}

 
updateValues();
