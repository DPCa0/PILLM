 
const { performance } = await import('perf_hooks');

 
const target = {
  msg: 'Hello, Proxy!'
};

const handler = {
  get(target, property) {
    if (property === 'msg') {
      return target[property].toUpperCase();
    }
    return Reflect.get(target, property);
  }
};

const proxy = new Proxy(target, handler);

 
async function* asyncGenerator() {
  yield 'First';
  await new Promise(resolve => setTimeout(resolve, 1000));
  yield 'Second';
  await new Promise(resolve => setTimeout(resolve, 1000));
  yield 'Third';
}

(async () => {
  print(proxy.msg);  

  const start = performance.now();
  
  for await (const value of asyncGenerator()) {
    print(value);
  }

  const end = performance.now();
  print(`Operation took ${end - start} milliseconds`);
})();

 
const uniqueSet = new Set([1, 2, 3, 3, 4]);
const dataMap = new Map([['a', 1], ['b', 2]]);
uniqueSet.add(5);
dataMap.set('c', 3);

print('Set:', uniqueSet);
print('Map:', dataMap);

 
const config = {
  url: 'http://example.com',
  timeout: 0
};

const timeout = config.timeout ?? 5000;
print('Timeout:', timeout);

const nestedObject = { inner: { value: 42 } };
const value = nestedObject?.inner?.value ?? 'default';
print('Value:', value);
