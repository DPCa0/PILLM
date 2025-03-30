 

const simulateAsyncOperation = (value, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      print(`Processed: ${value}`);
      resolve(value * 2);
    }, delay);
  });
};

const complexComputation = async () => {
  const values = [1, 2, 3, 4, 5];

   
  const promises = values.map(async (value) => {
    const result = await simulateAsyncOperation(value, value * 500);
    return result;
  });

   
  const results = await Promise.all(promises);

   
  const total = results.reduce((acc, val) => acc + val, 0);

  print(`Total: ${total}`);
};

complexComputation();
