 
 

 
async function* dataStream(urls) {
  for (const url of urls) {
    yield fetch(url).then(response => response.json());
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      print(`Getting property: ${prop}`);
      return Reflect.get(target, prop, receiver);
    } else {
      return `Property ${prop} does not exist`;
    }
  },
  set: (target, prop, value, receiver) => {
    print(`Setting property: ${prop} to value: ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const targetObject = { foo: 'bar' };
const proxy = new Proxy(targetObject, handler);

 
(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];
  
  const stream = dataStream(urls);
  
  proxy.newProperty = "I am new here!";

  for await (const dataPromise of stream) {
    print(proxy.foo);
    const data = await dataPromise;
    print(data.title);
  }

  print(proxy.nonExistentProperty);  
})();
