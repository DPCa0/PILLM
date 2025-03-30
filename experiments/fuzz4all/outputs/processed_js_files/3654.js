 

async function* numberGenerator() {
  let i = 0;
  while (true) {
    yield await new Promise(resolve => setTimeout(() => resolve(i++), 1000));
  }
}

const handler = {
  get(target, prop, receiver) {
    if (prop === 'next') {
      print('Calling next()');
      return Reflect.get(target, prop, receiver);
    }
    return Reflect.get(target, prop, receiver);
  }
};

async function main() {
  const proxyGen = new Proxy(numberGenerator(), handler);
  
  for await (const num of proxyGen) {
    print(num);
    if (num === 4) break;  
  }
}

main();
