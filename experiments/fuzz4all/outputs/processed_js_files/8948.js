const asyncOperation = (delay, value) => 
  new Promise(resolve => setTimeout(() => resolve(value), delay));

async function* asyncGenerator(arr) {
  for (const item of arr) {
    yield asyncOperation(1000, item);
  }
}

const complexCalculation = (val) => {
  try {
    return ((val ** 2) + Math.sqrt(val) - Math.cbrt(val)).toFixed(2);
  } catch (error) {
    console.error('Error in calculation:', error);
  }
};

const processArray = async (arr) => {
  const promises = [];
  for await (let item of asyncGenerator(arr)) {
    promises.push(Promise.resolve(item).then(complexCalculation));
  }
  const results = await Promise.allSettled(promises);
  results.forEach(({ status, value, reason }) => {
    if (status === 'fulfilled') {
      print(`Result: ${value}`);
    } else {
      console.error('Promise rejected:', reason);
    }
  });
};

const inputArray = Array.from({ length: 10 }, (_, i) => i + 1);
processArray(inputArray);
