 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Getting property '${property}': ${target[property]}`);
      return target[property];
    } else {
      print(`Property '${property}' not found.`);
      return undefined;
    }
  },
  set: (target, property, value) => {
    print(`Setting property '${property}' to ${value}`);
    target[property] = value;
    return true;
  }
};

const targetObject = { greeting: 'Hello', recipient: 'world' };
const proxyObject = new Proxy(targetObject, handler);

 
const { greeting, ...restProperties } = proxyObject;

 
function tag(strings, ...expressions) {
  print('Tagged template function output:', strings.raw[0], ...expressions);
  return `${strings[0]}${expressions[0]}, ${expressions[1]}!`;
}

 
const secret = Symbol('secret');
proxyObject[secret] = 'This is a secret!';

 
const fetchData = async () => {
  try {
     
    const data = await new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('Data fetched successfully') : reject('Fetch error');
      }, 1000);
    });
    print(data);
  } catch (error) {
    console.error(error);
  }
};

 
proxyObject.greeting = 'Hi';
print(tag`${proxyObject.greeting} ${proxyObject.recipient}`);
proxyObject.nonExistentProp;
print('Rest properties:', restProperties);
print('Secret Symbol value:', proxyObject[secret]);
fetchData();
