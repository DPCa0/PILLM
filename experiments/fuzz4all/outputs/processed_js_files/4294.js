 
const sumOfSquares = (...numbers) => numbers.reduce((acc, num) => acc + num ** 2, 0);

 
const handler = {
  get(target, property) {
    print(`Accessing property '${property}'`);
    return target[property];
  }
};

const data = {
  a: 1,
  b: 2,
  c: 3
};

const proxyData = new Proxy(data, handler);

 
(async function fetchData() {
  try {
    const { default: axios } = await import('https://cdn.skypack.dev/axios');
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched Data:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

 
const user = {
  name: 'John Doe',
  preferences: {
    theme: null
  }
};

const theme = user.preferences?.theme ?? 'default';
print(`Theme: ${theme}`);

 
print(`Value of a: ${proxyData.a}`);

 
function highlight(strings, ...values) {
  return strings.reduce((prev, current, i) => `${prev}<span>${values[i - 1]}</span>${current}`);
}

const userName = 'Alice';
const loginMessage = highlight`Welcome back, ${userName}!`;
print(loginMessage);
