 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: 'Hello, world!' }), 1000);
  });
};

 
const withLogging = (fn) => async (...args) => {
  print('Fetching data...');
  const result = await fn(...args);
  print('Data fetched:', result);
  return result;
};

 
const run = async () => {
  const fetchDataWithLogging = withLogging(fetchData);

   
  let [result1, result2] = await Promise.allSettled([
    fetchDataWithLogging(),
    fetchDataWithLogging(),
  ]);

   
  result1 = result1?.value ?? { data: 'No data' };
  result2 = result2?.value ?? { data: 'No data' };

   
  console.log(`Results:
  1: ${result1.data}
  2: ${result2.data}`);
};

run();
