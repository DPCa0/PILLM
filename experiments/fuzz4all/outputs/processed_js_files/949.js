 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting ${prop}`);
      return Reflect.get(target, prop, receiver);
    } else {
      console.warn(`Property ${prop} not found`);
      return undefined;
    }
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  },
};

const data = { value: 42 };
const proxyData = new Proxy(data, handler);

 
const processData = ([first, second, ...rest]) => {
  print(`First: ${first}, Second: ${second}, Rest: ${rest}`);
  return rest.map((num) => num * 2);
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const todo = await fetchData(url);

  if (todo) {
    print('Todo:', todo);
    proxyData.title = todo.title;

    const numbers = [1, 2, 3, 4, 5];
    const processed = processData(numbers);
    print('Processed:', processed);
  }
})();
