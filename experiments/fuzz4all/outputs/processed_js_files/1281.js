 

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Fetching Error:', error);
  }
}

 
const processUser = ({ name, age, email }) => {
  const message = `User Info:
  - Name: ${name}
  - Age: ${age}
  - Email: ${email}`;
  print(message);
};

 
const manipulateArray = (arr, callback) => arr.map(callback);

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

 
const handler = {
  get: (obj, prop) => (prop in obj ? obj[prop] : `Property ${prop} doesn't exist`),
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);

// Example Usage
(async () => {
  print(user.name); // Alice
  print(user.email); // Property email doesn't exist

  processUser({ name: 'Bob', age: 25, email: 'bob@example.com' });

  const nums = [1, 2, 3, 4];
  const doubled = manipulateArray(nums, (num) => num * 2);
  print('Doubled Numbers:', doubled);

  const gen = idGenerator();
  print('Generated IDs:', gen.next().value, gen.next().value, gen.next().value);

  await fetchData('https://jsonplaceholder.typicode.com/posts/1');
})();
