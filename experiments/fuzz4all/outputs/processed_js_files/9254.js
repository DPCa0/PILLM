 
const fetchData = (endpoint) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: 'Advanced JavaScript' };
      Math.random() > 0.5 ? resolve(data) : reject('Error fetching data');
    }, 1000);
  });
};

 
const processData = async (endpoint) => {
  try {
    const data = await fetchData(endpoint);
    print('Data fetched:', data);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

 
const displayUserInfo = ({ id, name }) => {
  print(`User Info - ID: ${id}, Name: ${name}`);
};

 
const multiplier = (x) => (y) => x * y;

 
(async () => {
  await processData('/api/data');
  const multiplyByTwo = multiplier(2);
  print(`4 multiplied by 2 is: ${multiplyByTwo(4)}`);
  
  const user = { id: 42, name: 'John Doe' };
  displayUserInfo(user);

   
  const numbers = [1, 2, 3, 4];
  const moreNumbers = [5, 6, ...numbers];
  const sum = (...args) => args.reduce((acc, curr) => acc + curr, 0);
  print(`Sum of numbers is: ${sum(...moreNumbers)}`);
})();
