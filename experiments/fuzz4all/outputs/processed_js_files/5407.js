 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const createCounter = (start = 0) => {
  let count = start;
  return {
    increment: (value = 1) => (count += value),
    decrement: (value = 1) => (count -= value),
    getCount: () => count,
  };
};

 
const processArray = ([first, ...rest]) => {
  const doubled = rest.map((n) => n * 2);
  return [first, ...doubled];
};

 
const getUniqueValues = (arr) => [...new Set(arr)];

 
(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched Data:', data);

    const counter = createCounter();
    print('Initial Count:', counter.getCount());
    counter.increment(5);
    print('Incremented Count:', counter.getCount());

    const processedArray = processArray([1, 2, 3, 4, 5]);
    print('Processed Array:', processedArray);

    const uniqueValues = getUniqueValues([1, 2, 2, 3, 4, 4, 5]);
    print('Unique Values:', uniqueValues);

    const { default: lodash } = await import('https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js');
    print('Lodash version:', lodash.VERSION);

  } catch (error) {
    console.error('Error in main block:', error);
  }
})();
