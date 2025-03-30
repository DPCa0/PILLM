const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
  }
};

const processNumbers = (...nums) => {
  return nums
    .filter((num) => num % 2 === 0)
    .map((num) => num ** 2)
    .reduce((acc, num) => acc + num, 0);
};

const enhancedLogging = (func) => {
  return (...args) => {
    print(`Arguments: ${JSON.stringify(args)}`);
    const result = func(...args);
    print(`Result: ${result}`);
    return result;
  };
};

const proxyHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessed property: ${prop}`);
      return target[prop];
    } else {
      print(`Property ${prop} does not exist`);
    }
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

const main = async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const data = await fetchData(url);
  print('Fetched Data:', data);

  const numbers = [1, 2, 3, 4, 5, 6];
  const enhancedProcess = enhancedLogging(processNumbers);
  const result = enhancedProcess(...numbers);

  const obj = new Proxy({ name: 'Alice', age: 30 }, proxyHandler);
  print(obj.name);
  obj.age = 31;
  print(obj.age);
  print(obj.nonExistentProperty);
};

main();
