 

 
const asyncOperation = (value, delay) => new Promise(resolve => setTimeout(() => resolve(value), delay));

 
function* asyncGenerator() {
  const a = yield asyncOperation('Fetching Data...', 1000);
  print(a);
  const b = yield asyncOperation('Processing Data...', 2000);
  print(b);
  const c = yield asyncOperation('Data Processed!', 1000);
  print(c);
  return 'Process Complete!';
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (typeof target[prop] === 'function') {
      return (...args) => {
        print(`Called ${prop} with arguments: ${args.join(', ')}`);
        return Reflect.apply(target[prop], receiver, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
const runAsyncGenerator = (genFunc) => {
  const iterator = genFunc();
  const iteratorWithProxy = new Proxy(iterator, handler);

  function handleResult(next) {
    if (next.done) return Promise.resolve(next.value);
    return Promise.resolve(next.value).then(
      result => handleResult(iteratorWithProxy.next(result)),
      error => handleResult(iteratorWithProxy.throw(error))
    );
  }

  return handleResult(iteratorWithProxy.next());
};

 
runAsyncGenerator(asyncGenerator).then(finalResult => print(finalResult));
