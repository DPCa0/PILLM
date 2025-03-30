 
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching data failed:', error);
  }
};

 
const processUser = ({ name, age = 25 }) => {
  print(`User's Name: ${name}, Age: ${age}`);
};

// An example of rest parameters and spread operator
const combineArrays = (arr1, arr2, ...extraItems) => {
  return [...arr1, ...arr2, ...extraItems];
};

// An IIFE (Immediately Invoked Function Expression) with a nested function
(async () => {
  const url = 'https: 
  const data = await fetchData(url);
  
  if (data) {
    data.forEach(user => processUser(user));
  }
  
  const combined = combineArrays([1, 2], [3, 4], 5, 6, 7);
  print('Combined Array:', combined);
  
  await wait(1000);  
  print('Finished execution after waiting for 1 second.');
})();
