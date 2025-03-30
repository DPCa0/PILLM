const asyncOperation = () => new Promise((resolve) => setTimeout(() => resolve('Data fetched'), 1000));

const processData = (data) => {
  const transformed = data.split('').reverse().join('');
  return `Processed: ${transformed}`;
};

(async function complexFunction() {
  try {
     
    const results = await Promise.all([
      asyncOperation(),
      asyncOperation(),
      asyncOperation(),
    ]);

     
    const [first, ...rest] = results;
    print(`First result: ${first}`);

     
    const uniqueResults = new Set(rest);
    uniqueResults.add(first);

     
    for (const result of uniqueResults) {
       
      print(`Unique result: ${result}`);
    }

     
    const processedData = new Map(
      [...uniqueResults].map((item) => [item, processData(item)])
    );

     
    const finalData = Object.fromEntries(
      [...processedData.entries()].map(([key, value]) => [`${key}-key`, value])
    );

     
    print(finalData?.['Data fetched-key'] ?? 'No data found');
  } catch (error) {
    console.error('Error:', error);
  }
})();
