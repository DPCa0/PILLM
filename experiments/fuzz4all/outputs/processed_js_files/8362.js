const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncNumberGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    await delay(100);   
    yield i;
  }
}

async function processData(array) {
   
  const results = await Promise.all(array.map(async num => {
    if (num % 2 === 0) {
      const double = await doubleAsync(num);
      return { num, result: double };
    }
    return { num, result: num };
  }));
  return results;
}

function doubleAsync(n) {
  return new Promise(resolve => {
    setTimeout(() => resolve(n * 2), 200);   
  });
}

(async () => {
  try {
    const nums = asyncNumberGenerator(1, 5);
    let processedNumbers = [];
    for await (const num of nums) {
      processedNumbers.push(num);
    }

    const results = await processData(processedNumbers);
    print('Results:', results);

    const summary = results.reduce((acc, { num, result }) => {
      acc[`original-${num}`] = result;
      return acc;
    }, {});

    print('Summary:', summary);
  } catch (error) {
    console.error('Error:', error);
  }
})();
