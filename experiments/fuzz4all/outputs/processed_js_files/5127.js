 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* asyncGenerator() {
  print('Step 1: Start generator');
  yield delay(1000).then(() => print('Step 2: After 1 second delay'));
  print('Step 3: Continue generator');
  yield delay(2000).then(() => print('Step 4: After 2 seconds delay'));
  print('Step 5: Generator complete');
}

 
async function runGenerator(gen) {
  const iterator = gen();
  let result = iterator.next();

  while (!result.done) {
    if (result.value instanceof Promise) {
      await result.value;
    }
    result = iterator.next();
  }
}

 
(async () => {
  print('Start async flow');
  await runGenerator(asyncGenerator);
  print('End async flow');
})();
