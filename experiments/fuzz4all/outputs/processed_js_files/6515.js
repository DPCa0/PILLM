 

 
const fetchData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: 'Important Data', error: null }), 1000)
  );

 
function* asyncFlow() {
  try {
    const data = yield fetchData();
    print('Data received:', data);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

 
const handler = {
  get(target, prop) {
    print(`Property '${prop}' was accessed`);
    return Reflect.get(target, prop);
  }
};

const targetObject = { name: 'Advanced JS', version: 'ES2023' };
const proxy = new Proxy(targetObject, handler);

 
async function runner(generator) {
  const iterator = generator();
  function step(iteration) {
    if (iteration.done) return Promise.resolve(iteration.value);
    return Promise.resolve(iteration.value).then(
      (result) => step(iterator.next(result)),
      (error) => step(iterator.throw(error))
    );
  }
  return step(iterator.next());
}

 
runner(asyncFlow);
print('Using Proxy:');
print(proxy.name);
print(proxy.version);
