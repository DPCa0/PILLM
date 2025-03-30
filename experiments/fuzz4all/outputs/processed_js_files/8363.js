 
const { promises: fs } = require('fs');
const os = require('os');

 
(async () => {
  try {
     
    const { platform, totalmem, freemem } = os;
    const systemInfo = `Platform: ${platform()}, Total Memory: ${(totalmem() / (1024 ** 3)).toFixed(2)} GB, Free Memory: ${(freemem() / (1024 ** 3)).toFixed(2)} GB`;

     
    const handler = {
      get: (target, prop) => (...args) => {
        target[prop](...args);
        fs.appendFile('log.txt', `[${new Date().toISOString()}] ${args.join(' ')}\n`);
      }
    };
    const logger = new Proxy(console, handler);

     
    const uniqueValues = new Set([...[1, 2, 3], ...[2, 3, 4]]);
    const valueMap = new Map([...uniqueValues].map(value => [value, value ** 2]));

     
    const delayedComputation = async (num) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return num * 10;
    };

    const results = await Promise.all([...valueMap.values()].map(delayedComputation));

     
    logger.log(systemInfo);
    logger.log('Unique Values:', [...uniqueValues]);
    logger.log('Value Map:', [...valueMap]);
    logger.log('Computation Results:', results);
  } catch (error) {
    console.error('Error:', error);
  }
})();
