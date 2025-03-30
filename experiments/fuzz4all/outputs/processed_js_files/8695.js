 
function* fetchDataGenerator() {
  const data1 = yield fetchDataPromise('https://jsonplaceholder.typicode.com/posts/1');
  const data2 = yield fetchDataPromise('https://jsonplaceholder.typicode.com/posts/2');
  return [data1, data2];
}

function fetchDataPromise(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

function asyncGeneratorRunner(generator) {
  const iterator = generator();

  function handle(result) {
    if (result.done) return Promise.resolve(result.value);
    return Promise.resolve(result.value).then(
      res => handle(iterator.next(res)),
      err => handle(iterator.throw(err))
    );
  }

  try {
    return handle(iterator.next());
  } catch (ex) {
    return Promise.reject(ex);
  }
}

asyncGeneratorRunner(fetchDataGenerator)
  .then(data => console.log('Fetched Data:', data))
  .catch(error => console.error('Error:', error));

 
const target = {
  msg: 'Hello, Proxy!'
};

const handler = {
  get: (target, prop, receiver) => {
    if (prop === 'msg') {
      return Reflect.get(target, prop, receiver) + ' (modified by Proxy)';
    }
    return Reflect.get(target, prop, receiver);
  }
};

const proxy = new Proxy(target, handler);
print(proxy.msg);  
