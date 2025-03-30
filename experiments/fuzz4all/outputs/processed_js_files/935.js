 
async function* asyncGenerator(array) {
  for (let item of array) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield `Processed: ${item}`;
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop === 'length') {
      return Reflect.get(target, prop, receiver);
    }
    return `Accessed property ${String(prop)}`;
  },
  set: (target, prop, value) => {
    if (typeof value === 'number') {
      Reflect.set(target, prop, value * 2);
      print(`Setting value ${value} doubled to ${value * 2}`);
    }
  }
};

 
let numbers = new Proxy([1, 2, 3], handler);
numbers.push(4);
print(numbers[1]);  
print(numbers.length);  

 
async function processItems() {
  const items = [1, 2, 3, 4, 5];
  const asyncGen = asyncGenerator(items);
  const results = [];
  
  for await (let result of asyncGen) {
    results.push(result);
  }
  
  return Promise.all(results);
}

processItems().then(console.log);  

 
function tag(strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i] ? `**${values[i].toUpperCase()}**` : '';
    return result + string + value;
  }, '');
}

const name = 'world';
print(tag`Hello, ${name}!`);  
