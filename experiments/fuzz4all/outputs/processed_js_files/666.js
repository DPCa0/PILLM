 
import fetch from 'node-fetch';

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const processUserData = (data) => {
  const { name, email, ...rest } = data;
  const fullData = { name, email, ...rest, status: 'processed' };
  return `User: ${fullData.name}, Email: ${fullData.email}, Status: ${fullData.status}`;
};

 
(async function main() {
  const url = 'https://jsonplaceholder.typicode.com/users/1';
  const userData = await fetchData(url);
  if (userData) {
    print(processUserData(userData));
  }
})();

 
const handler = {
  get: (target, property) => {
    print(`Getting ${property} value`);
    return target[property] || 'Property does not exist';
  },
};

const user = { name: 'Jane Doe', age: 25 };
const proxiedUser = new Proxy(user, handler);

print(proxiedUser.name);  
print(proxiedUser.email);  
