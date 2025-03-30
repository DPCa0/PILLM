 

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Property '${prop}' accessed`);
    return Reflect.get(...arguments);
  }
};

const targetObject = {
  a: 1,
  b: 2,
  get sum() {
    return this.a + this.b;
  }
};

const proxiedObject = new Proxy(targetObject, handler);

 
function* generatorFunction() {
  yield Promise.resolve(10);
  yield Promise.resolve(20);
  yield Promise.resolve(30);
}

async function processGenerator(gen) {
  const iter = gen();
  for await (const val of iter) {
    print(`Processing value: ${val}`);
  }
}

async function main() {
  print(`Sum: ${proxiedObject.sum}`);
  
   
  await processGenerator(generatorFunction);
}

main().then(() => print('All tasks completed.'));
