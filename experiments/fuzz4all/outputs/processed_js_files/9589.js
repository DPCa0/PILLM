 

 
const createPerson = ({ name = 'Anonymous', age = 0, ...rest } = {}) => ({
  name,
  age,
  ...rest
});

 
async function* asyncGenerator(start = 0, end = 5) {
  for (let i = start; i <= end; i++) {
    await new Promise(res => setTimeout(res, 100));  
    yield i;
  }
}

 
const handler = {
  get(target, property) {
    print(`Getting ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const target = { message: 'Hello, Proxy!' };
const proxy = new Proxy(target, handler);

 
(async () => {
   
  proxy.message = 'Hello, Advanced JavaScript!';
  print(proxy.message);

   
  const person = createPerson({ name: 'Alice', age: 30, occupation: 'Engineer' });
  print(person);

   
  print('Async generator output:');
  for await (let num of asyncGenerator(1, 3)) {
    print(num);
  }
})();
