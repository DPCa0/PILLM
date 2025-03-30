 

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Data fetched successfully'), 1000);
  });
}

 
function* asyncGenerator() {
  const data = yield fetchData();
  print(data);
}

 
function run(generatorFunc) {
  const generator = generatorFunc();

  function handle(yielded) {
    if (!yielded.done) {
      yielded.value.then((result) => handle(generator.next(result)));
    }
  }

  handle(generator.next());
}

 
const handler = {
  get(target, property) {
    print(`Getting property ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, handler);

 
print(proxy.a);   
proxy.b = 3;            

 
run(asyncGenerator);
