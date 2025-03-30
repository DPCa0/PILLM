 
const createMultiplier = (factor) => (...nums) => nums.map(num => num * factor);

 
const user = {
  name: 'Alice',
  age: 25
};

const handler = {
  get(target, prop, receiver) {
    if (prop === 'age') {
      print('Accessing the age property');
    }
    return Reflect.get(...arguments);
  },
  set(target, prop, value) {
    if (prop === 'name' && typeof value !== 'string') {
      throw new Error('Name must be a string');
    }
    target[prop] = value;
    return true;
  }
};

const proxiedUser = new Proxy(user, handler);

 
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function greetAfterDelay(message, ms) {
  await delay(ms);
  print(message);
}

 
const multiplier = createMultiplier(2);
print(multiplier(1, 2, 3));  

print(proxiedUser.name);  
proxiedUser.age = 26;  

const fib = fibonacci();
print(fib.next().value);  
print(fib.next().value);  
print(fib.next().value);  

greetAfterDelay('Hello after delay', 1000);  
