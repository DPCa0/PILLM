 
import 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js';

 
async function* numberGenerator(limit) {
  let num = 1;
  while (num <= limit) {
    yield new Promise(resolve => setTimeout(() => resolve(num++), 100));
  }
}

 
async function processNumbers(limit) {
  const numbers = numberGenerator(limit);
  const promises = [];

  for await (let num of numbers) {
    promises.push(
      Promise.resolve(num).then(value => {
        print(`Processing: ${value}`);
        return value * 2;
      })
    );
  }

  return Promise.all(promises);
}

 
processNumbers(5).then(results => {
  const sum = _.sum(results);
  print(`Sum of doubled numbers: ${sum}`);
});

 
const handler = {
  get: (target, property) => {
    print(`Getting ${property}`);
    return property in target ? target[property] : 37;
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    target[property] = value * 2;  
    return true;
  }
};

const targetObj = { a: 10 };
const proxy = new Proxy(targetObj, handler);

 
print(proxy.a);    
                         
proxy.b = 5;             
print(proxy.b);    
                         
