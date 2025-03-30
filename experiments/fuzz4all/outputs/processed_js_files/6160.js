 
async function complexFeatureExample() {
   
  const user = { name: 'Alice', age: 30, email: 'alice@example.com' };
  const { name, email } = user;

   
  print(`Hello, ${name}! Your registered email is: ${email}`);

   
  const fruits = new Map([
    ['apple', { price: 1.2, quantity: 3 }],
    ['banana', { price: 0.8, quantity: 5 }],
    ['orange', { price: 0.9, quantity: 2 }],
  ]);

   
  const updatedFruits = [...fruits.entries()].map(([key, value]) => {
    return [key, { ...value, quantity: value.quantity * 2 }];
  });
  const doubledFruits = new Map(updatedFruits);

   
  for (const [fruit, { price, quantity }] of doubledFruits) {
    print(`Fruit: ${fruit}, New Quantity: ${quantity}`);
  }

   
  const fetchData = async (url) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Fetched data from ${url}`);
      }, 1000);
    });
  };

  const url = 'https://api.example.com/data';
  try {
    const response = await fetchData(url);
    print(response);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

   
  const uniqueNumbers = new Set([1, 2, 2, 3, 4, 5, 5]);
  print('Unique numbers:', [...uniqueNumbers]);

   
  const uniqueKey = Symbol('unique');
  const obj = {
    [uniqueKey]: 'This is a unique value',
  };
  print('Accessing a unique key:', obj[uniqueKey]);

   
  function* numberGenerator() {
    let num