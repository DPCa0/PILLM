Certainly! Here is a JavaScript program that uses several advanced features like Promises, async/await, destructuring, arrow functions, and the spread operator:

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.2;
      success ? resolve({ data: { id: 1, name: 'Sample Data', values: [1, 2, 3] } }) : reject('Fetch Error');
    }, 1000);
  });
};

 
const processData = async () => {
  try {
    const { data: { id, name, values } } = await fetchData();  
    print(`Fetched Data ID: ${id}, Name: ${name}`);

     
    const newValues = [...values, ...values.map(x => x * 2)];
    print('Processed Values:', newValues);

     
    const squaredValues = newValues.map(value => value ** 2);
    print('Squared Values:', squaredValues);

    return squaredValues;
  } catch (error) {
    console.error('Error:', error);
  }
};

 
processData();

This script performs a simulated fetch operation, processes the data using advanced JavaScript features, and handles potential errors gracefully.