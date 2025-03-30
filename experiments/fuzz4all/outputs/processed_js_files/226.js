 
const delayLog = (message, delay) => new Promise(resolve => setTimeout(() => {
  print(message);
  resolve();
}, delay));

 
async function* numberGenerator(limit) {
  for (let i = 1; i <= limit; i++) {
    await delayLog(`Generating number: ${i}`, 500);
    yield i;
  }
}

 
async function advancedFeatureDemo() {
   
  const array = [1, 2, 3, 4];
  const [first, ...rest] = array;
  const combinedArray = [...rest, first];

  print('Combined Array:', combinedArray);

   
  const map = new Map();
  map.set('A', 1).set('B', 2);
  const set = new Set([1, 2, 3]);

  print('Map and Set initial states:', map, set);

   
  const promises = [
    Promise.resolve('Success'),
    Promise.reject('Failure'),
    delayLog('Async Success', 1000)
  ];

  const results = await Promise.allSettled(promises);
  print('Promise Results:', results);

   
  print('Starting number generation...');
  for await (const num of numberGenerator(3)) {
    print('Generated Number:', num);
  }
}

 
(async () => {
  try {
    await advancedFeatureDemo();
  } catch (error) {
    console.error('Error in advancedFeatureDemo:', error);
  }
})();
