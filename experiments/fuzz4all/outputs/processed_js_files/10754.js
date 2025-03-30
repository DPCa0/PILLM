 
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function processData(data) {
  try {
    if (typeof data !== 'string') {
      throw new ValidationError('Data must be a string');
    }
    print('Processing data...');
    await delay(1000);  
    const processedData = data.toUpperCase();

    return new Proxy(processedData, {
      get: (target, prop) => {
        if (prop === 'length') {
          print('Accessing length property');
        }
        return target[prop];
      }
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(`Validation Error: ${error.message}`);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

 
function* dataGenerator() {
  yield 'hello';
  yield 'world';
}

 
(async () => {
  const generator = dataGenerator();
  for (const value of generator) {
    const result = await processData(value);
    if (result) {
      print(`Result: ${result}, Length: ${result.length}`);
    }
  }

   
  const uniqueValues = new Set(['apple', 'banana', 'apple']);
  print('Unique Values:', [...uniqueValues]);
})();
