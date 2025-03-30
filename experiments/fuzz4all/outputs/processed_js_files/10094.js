 
async function* fetchData() {
  const data = ['Item1', 'Item2', 'Item3'];
  for (const item of data) {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield item;
  }
}

 
const user = {
  name: 'Alice',
  age: 25
};

const handler = {
  get(target, property) {
    print(`Property ${property} has been accessed`);
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    print(`Property ${property} is set to ${value}`);
    return Reflect.set(target, property, value);
  }
};

const proxyUser = new Proxy(user, handler);

 
async function processData() {
  for await (const item of fetchData()) {
    print(`Processing ${item}`);
  }
}

 
function tag(strings, ...values) {
  return strings.reduce((result, str, i) => result + str + (values[i] ? `<strong>${values[i]}</strong>` : ''), '');
}

const name = 'John';
const message = tag`Hello, ${name}. Welcome to the advanced JavaScript program!`;
print(message);

 
proxyUser.name;  
proxyUser.age = 30;  

 
processData();
