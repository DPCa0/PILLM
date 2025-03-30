 
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

 
const logger = {
  get: function (target, property) {
    print(`Property ${property} accessed.`);
    return property in target ? target[property] : null;
  },
};

const user = new Proxy({ name: "John Doe", age: 30 }, logger);

 
function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  while (limit-- > 0) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
function displayUserInfo({ name, age, ...rest }) {
  print(`Name: ${name}, Age: ${age}, Other:`, rest);
}

 
(async function main() {
  try {
     
    const apiUrl = 'https://jsonplaceholder.typicode.com/users/1';
    const data = await fetchData(apiUrl);
    print('Fetched Data:', data);

     
    print('User name:', user.name);
    print('User age:', user.age);

     
    print('Fibonacci sequence:');
    for (const num of fibonacci(5)) {
      print(num);
    }

     
    const userDetails = { name: 'Jane Doe', age: 25, occupation: 'Engineer', country: 'US' };
    displayUserInfo(userDetails);
  } catch (error) {
    console.error('Error:', error);
  }
})();
