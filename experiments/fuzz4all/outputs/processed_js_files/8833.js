 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

 
const handler = {
  get: (target, prop) => {
    print(`Property ${prop} has been accessed`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Property ${prop} has been set to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
const createReactiveObject = (obj) => new Proxy(obj, handler);

 
const runExample = async () => {
  try {
     
    const reactiveObject = createReactiveObject({ message: 'Hello, world!' });

     
    print(reactiveObject.message);

     
    reactiveObject.message = 'Advanced JavaScript is powerful!';
    print(reactiveObject.message);

     
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const data = await fetchData(url);

     
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

 
runExample();
