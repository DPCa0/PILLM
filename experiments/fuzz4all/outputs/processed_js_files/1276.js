 
const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      print(`Getting ${prop} from target`);
      return Reflect.get(target, prop, receiver);
    } else {
      return `Property ${prop} not found`;
    }
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const targetObject = { message: 'Hello, World!' };
const proxy = new Proxy(targetObject, handler);

async function* generator() {
  let count = 0;
  while (count < 3) {
    yield new Promise(resolve => setTimeout(() => resolve(count++), 1000));
  }
}

async function run() {
  for await (const num of generator()) {
    print(`Generator yielded: ${num}`);
    proxy[`value${num}`] = num;  
  }
  print(proxy.message);    
}

run();
