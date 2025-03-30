 

 
async function* asyncGenerator() {
  yield await new Promise(resolve => setTimeout(() => resolve('First'), 1000));
  yield await new Promise(resolve => setTimeout(() => resolve('Second'), 1000));
  yield await new Promise(resolve => setTimeout(() => resolve('Third'), 1000));
}

 
const target = {
  a: 1,
  b: 2,
  c: 3
};

const handler = {
  get: (obj, prop) => {
    print(`Property '${prop}' was accessed.`);
    return obj[prop] * 2;   
  }
};

const proxiedObject = new Proxy(target, handler);

 
async function main() {
  print('Start');

   
  for await (const value of asyncGenerator()) {
    print('Generated:', value);
  }

   
  print('a:', proxiedObject.a);
  print('b:', proxiedObject.b);
  print('c:', proxiedObject.c);

   
  const results = await Promise.all([
    new Promise(resolve => setTimeout(() => resolve('Resolved 1'), 500)),
    new Promise(resolve => setTimeout(() => resolve('Resolved 2'), 1500))
  ]);

  print('Promise.all results:', results);

  print('End');
}

main();
