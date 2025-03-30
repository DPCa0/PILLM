 
const { EventEmitter } = require('events');

 
const dynamicObject = new Proxy(
  { secret: 42 },
  {
    get: (target, prop) => {
      if (prop === 'reveal') {
        return target.secret;
      } else if (prop in target) {
        return target[prop];
      } else {
        throw new Error(`Property ${prop} does not exist!`);
      }
    },
  }
);

 
function* numberGenerator(start = 0, end = 10) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

 
async function processNumbers() {
  try {
    const numbers = [...numberGenerator(1, 5)];
    const results = await Promise.all(
      numbers.map(
        (num) =>
          new Promise((resolve) =>
            setTimeout(() => resolve(num * num), num * 100)
          )
      )
    );
    return results;
  } catch (error) {
    console.error('Error processing numbers:', error);
  }
}

 
const emitter = new EventEmitter();

 
emitter.on('complete', async () => {
  const results = await processNumbers();
  print('Squared Numbers:', results);
});

 
(async () => {
  try {
     
    print('Secret revealed:', dynamicObject.reveal);

     
    emitter.emit('complete');
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
