 
const fibonacci = {
  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (true) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
};

 
const logger = new Proxy(console, {
  get(target, prop) {
    if (prop in target) {
      return (...args) => {
        target.log(`Console method called: ${prop}`);
        target[prop](...args);
      };
    }
    return undefined;
  }
});

 
async function asyncTasks() {
  const promises = [
    fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json()),
    fetch('https://jsonplaceholder.typicode.com/posts/2').then(res => res.json()),
    Promise.reject('Intentional Error')
  ];

  const results = await Promise.allSettled(promises);
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      logger.log(`Task ${index} successful:`, result.value);
    } else {
      logger.error(`Task ${index} failed:`, result.reason);
    }
  });
}

 
(function() {
  const {log, error} = logger;
  const [first, second, ...rest] = [1, 2, 3, 4, 5];
  log('Destructured first and second:', first, second);
  log('Rest elements:', ...rest);

   
  const objFromEntries = Object.fromEntries([['name', 'John'], ['age', 30]]);
  log('Object from entries:', objFromEntries);
})();

 
(async function main() {
  logger.log('Starting async tasks...');
  await asyncTasks();

  logger.log('Fibonacci sequence:');
  for (const num of fibonacci) {
    if (num > 100) break;
    logger.log(num);
  }
})();
