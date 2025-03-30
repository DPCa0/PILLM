 
const { EventEmitter } = require('events');

 
const fibonacci = {
  [Symbol.asyncIterator]() {
    let [prev, curr] = [0, 1];
    return {
      async next() {
         
        await new Promise(resolve => setTimeout(resolve, 100));
        [prev, curr] = [curr, prev + curr];
        return { value: curr, done: false };
      }
    };
  }
};

 
async function demoPromiseAllSettled() {
  const promises = [
    Promise.resolve('Success'),
    Promise.reject('Error'),
    new Promise(resolve => setTimeout(() => resolve('Delayed Success'), 200))
  ];

  const results = await Promise.allSettled(promises);
  print('Promise.allSettled results:', results);
}

 
async function generateFibonacci(limit) {
  const eventEmitter = new EventEmitter();

   
  eventEmitter.on('fibonacci', (num) => print('Fibonacci number:', num));

  let counter = 0;
  for await (const num of fibonacci) {
    if (counter >= limit) break;
    eventEmitter.emit('fibonacci', num);
    counter++;
  }
}

 
(async () => {
  print('Starting Fibonacci generation...');
  await generateFibonacci(10);
  print('Fibonacci generation completed.');

  await demoPromiseAllSettled();
})();
