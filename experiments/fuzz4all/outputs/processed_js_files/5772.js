const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

class Observer {
  constructor() {
    this.subscribers = new Map();
  }
  
  subscribe(event, callback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event).push(callback);
  }
  
  notify(event, data) {
    if (this.subscribers.has(event)) {
      this.subscribers.get(event).forEach(callback => callback(data));
    }
  }
}

function* generatorFunc(limit) {
  let count = 0;
  while (count < limit) {
    yield count++;
  }
}

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos';
  const observer = new Observer();

  observer.subscribe('dataFetched', (data) => {
    print('First 5 todos:');
    data.slice(0, 5).forEach(todo => print(todo.title));
  });
  
  try {
    const data = await fetchData(url);
    observer.notify('dataFetched', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
  
  const gen = generatorFunc(5);
  for (let value of gen) {
    print(`Generator value: ${value}`);
  }

  const proxyHandler = {
    get: (target, prop) => {
      if (prop in target) {
        print(`Property '${prop}' accessed`);
        return target[prop];
      } else {
        throw new Error(`Property '${prop}' does not exist`);
      }
    }
  };

  const targetObj = { name: 'Advanced JS', year: 2023 };
  const proxyObj = new Proxy(targetObj, proxyHandler);

  print(proxyObj.name);
  try {
    print(proxyObj.nonExistent);
  } catch (error) {
    console.error(error.message);
  }
})();
