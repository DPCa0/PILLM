 

 
const fetchData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: { user: { name: 'John Doe', age: 30 } } }), 1000)
  );

 
const timeExecution = (fn) => async (...args) => {
  const start = performance.now();
  const result = await fn(...args);
  const end = performance.now();
  print(`Execution time: ${end - start} ms`);
  return result;
};

 
const processUserData = timeExecution(async () => {
  try {
    const { data: { user: { name, age } } } = await fetchData();
    print(`User's Name: ${name}, Age: ${age}`);

    // Use of template literals
    const userInfo = `Name: ${name}, Age: ${age}`;
    print(`User Info: ${userInfo}`);

    // Higher-order function: Array.map()
    const userAttributes = ['name', 'age'].map(attr => userInfo.match(new RegExp(`${attr}: \\w+`))[0]);
    print(`Attributes: ${userAttributes.join(', ')}`);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
});

processUserData();
