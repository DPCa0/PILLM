 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

 
function processNumbers(numbers) {
  const [first, ...rest] = numbers;
  const processed = rest.map(num => num * 2).filter(num => num > first);
  const total = processed.reduce((acc, curr) => acc + curr, 0);
  return { processed, total };
}

 
const user = {
  name: 'John Doe',
  age: 30
};

const handler = {
  set(target, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    target[prop] = value;
    return true;
  }
};

const proxyUser = new Proxy(user, handler);

 
(async function main() {
  try {
    const apiData = await fetchData('https://jsonplaceholder.typicode.com/users');
    print('Fetched API Data:', apiData);

    const { processed, total } = processNumbers([5, 10, 15, 20]);
    print('Processed Numbers:', processed, 'Total:', total);

    proxyUser.age = 31;  
    print('Updated User:', proxyUser);

     
     
  } catch (error) {
    console.error('Error in main function:', error);
  }
})();
