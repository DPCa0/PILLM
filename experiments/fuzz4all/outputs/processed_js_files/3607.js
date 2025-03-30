const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator(array) {
  for (let item of array) {
    await delay(1000);
    yield item;
  }
}

async function processArray(array) {
  const results = await Promise.allSettled(array.map(async (number) => {
    if (number < 0) {
      throw new Error('Negative number not allowed');
    }
    return number * 2;
  }));
  
  const fulfilledResults = results.filter(res => res.status === 'fulfilled').map(res => res.value);
  return fulfilledResults;
}

(async function() {
  const data = [1, 2, -3, 4, 5];
  const iterable = asyncGenerator(data);

  for await (let item of iterable) {
    try {
      const result = await processArray([item]);
      print('Processed:', result);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
})();
