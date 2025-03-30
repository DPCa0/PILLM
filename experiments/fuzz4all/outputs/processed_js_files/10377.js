 

const fetchData = async (url) => {
  try {
     
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');

    let data = await response.json();

     
    const { userId, title } = data;

     
    print(`User ID: ${userId}, Title: ${title}`);

     
    const simulatedAsyncWork = new Promise((resolve) =>
      setTimeout(() => resolve("Simulated async work done"), 1000)
    );

    let result = await simulatedAsyncWork;
    print(result);

  } catch (error) {
    console.error('Fetch error: ', error);
  }
};

 
const target = {};
const handler = {
  set: (obj, prop, value) => {
    print(`Setting property '${prop}' to '${value}'`);
    obj[prop] = value;
    return true;
  },
  get: (obj, prop) => {
    print(`Getting property '${prop}'`);
    return prop in obj ? obj[prop] : undefined;
  },
};

const proxy = new Proxy(target, handler);
proxy.exampleProperty = "Proxy example";
print(proxy.exampleProperty);

 
fetchData('https://jsonplaceholder.typicode.com/todos/1');
