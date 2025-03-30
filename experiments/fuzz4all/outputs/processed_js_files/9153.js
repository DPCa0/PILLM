 

 
function* createAsyncGenerator() {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  yield delay(1000).then(() => 'First Value');
  yield delay(2000).then(() => 'Second Value');
  yield delay(3000).then(() => 'Third Value');
}

 
async function handleAsyncGenerator() {
  const gen = createAsyncGenerator();
  for await (const promise of gen) {
    print(await promise);
  }
}

 
const target = {
  a: 1,
  b: 2,
  c: 3,
};

const handler = {
  get: (obj, prop) => {
    print(`Property '${prop}' has been accessed.`);
    return Reflect.get(obj, prop);
  },
};

const proxy = new Proxy(target, handler);

print(proxy.a);  
print(proxy.b);  

 
handleAsyncGenerator();
