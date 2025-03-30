 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'Sample Data', status: 200 });
    }, 1000);
  });
};

 
const loggerDecorator = (fn) => {
  return async (...args) => {
    print('Starting function...');
    try {
      const result = await fn(...args);
      print('Function successful:', result);
      return result;
    } catch (error) {
      console.error('Function failed:', error);
      throw error;
    } finally {
      print('Function finished.');
    }
  };
};

 
const fetchWithLogging = loggerDecorator(fetchData);

 
const executeAsyncTask = async () => {
  try {
    const { data, status } = await fetchWithLogging();
    if (status === 200) {
      print(`Received data: ${data}`);
    }
  } catch (error) {
    console.error('Error during execution:', error);
  }
};

 
(async () => {
  print('Start Async Execution');
  await executeAsyncTask();
  print('End Async Execution');
})();
