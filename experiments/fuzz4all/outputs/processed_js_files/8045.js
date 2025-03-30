 

const fetchData = async () => {
   
  const simulateNetworkRequest = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ id: 1, name: 'John Doe', data: [1, 2, 3, 4] }), 1000)
    );

  const data = await simulateNetworkRequest();

   
  const { id, name, data: numbers } = data;
  const [first, ...rest] = numbers;

   
  const processNumbers = (nums) => nums.map((num) => num * num);

  print(`User ID: ${id}`);
  print(`Name: ${name}`);
  print(`Original numbers: ${numbers}`);
  print(`First number squared: ${first * first}`);
  print(`Rest of numbers squared: ${processNumbers(rest)}`);
};

fetchData();
