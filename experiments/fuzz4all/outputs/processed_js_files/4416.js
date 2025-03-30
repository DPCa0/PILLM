const fetchData = async (url) => {
   
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

const processNumbers = (numbers) => {
   
  function* squareGenerator(nums) {
    for (let num of nums) {
      yield num ** 2;
    }
  }
  return Array.from(squareGenerator(numbers));
};

const memoize = (fn) => {
   
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
};

const sumNumbers = (...nums) => nums.reduce((a, b) => a + b, 0);

 
const main = async () => {
  try {
    const dataUrl = 'https://api.example.com/numbers';
    const { numbers } = await fetchData(dataUrl);
    
    const squaredNumbers = processNumbers(numbers);
    
    const memoizedSum = memoize(sumNumbers);
    const total = memoizedSum(...squaredNumbers);
    
    print('Total of squared numbers:', total);
  } catch (error) {
    console.error('Error:', error);
  }
};

 
(async () => await main())();
