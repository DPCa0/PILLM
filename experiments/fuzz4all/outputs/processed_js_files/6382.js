 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const dataHandler = {
  get(target, property) {
    print(`Accessing property ${property}`);
    return target[property];
  }
};

const data = new Proxy({
  message: 'Hello from Async World!',
  value: 42
}, dataHandler);

 
function* asyncGenerator() {
  yield delay(1000).then(() => data.message);
  yield delay(1000).then(() => data.value);
}

 
async function handleAsyncGenerator(gen) {
  const generator = gen();
  let result = generator.next();
  while (!result.done) {
    print(await result.value);
    result = generator.next();
  }
}

 
(async () => {
  print('Fetching data...');
  await handleAsyncGenerator(asyncGenerator);
  print('Done!');
})();
