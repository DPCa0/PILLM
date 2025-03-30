const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = (data) => {
  return data.map(({ id, name, ...rest }) => ({
    identifier: id,
    fullName: name.toUpperCase(),
    attributes: { ...rest }
  })).filter(item => item.identifier % 2 === 0);
};

const exampleAsyncProcessing = async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/users');
  const processedData = processData(data);
  processedData.forEach(({ identifier, fullName }) => print(`${identifier}: ${fullName}`));
};

exampleAsyncProcessing();

const addAsyncLogging = (fn) => {
  return async function(...args) {
    print(`Executing ${fn.name} with arguments:`, args);
    const result = await fn(...args);
    print(`Result from ${fn.name}:`, result);
    return result;
  };
};

const asyncSquare = addAsyncLogging(async (number) => {
  return new Promise((resolve) => setTimeout(() => resolve(number * number), 1000));
});

(async () => {
  await asyncSquare(5);
  await asyncSquare(10);
})();
