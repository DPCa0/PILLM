 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

 
const withErrorHandling = (fn) => async (...args) => {
  try {
    return await fn(...args);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

 
const loggerProxy = (obj) => {
  return new Proxy(obj, {
    get(target, property, receiver) {
      const original = Reflect.get(target, property, receiver);
      if (typeof original === 'function') {
        return (...args) => {
          print(`Calling ${property} with arguments:`, args);
          return original.apply(target, args);
        };
      }
      return original;
    }
  });
};

 
function timeExecution(target, key, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {
    console.time(key);
    const result = originalMethod.apply(this, args);
    console.timeEnd(key);
    return result;
  };
  return descriptor;
}

 
class DataProcessor {
  @timeExecution
  process(data) {
     
    for (let i = 0; i < 1e6; i++) {}
    return data.map(item => item * 2);
  }
}

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const fetchWithErrorHandling = withErrorHandling(fetchData);
  
  const data = await fetchWithErrorHandling(url);
  
  const processor = new DataProcessor();
  const loggedProcessor = loggerProxy(processor);
  
  const processedData = loggedProcessor.process(data.map(item => item.id));
  
  print('Processed Data:', processedData);
})();
