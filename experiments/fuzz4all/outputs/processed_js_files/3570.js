class Observable {
  constructor() {
    this.subscribers = new Set();
  }
  
  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }

  notify(data) {
    this.subscribers.forEach(fn => fn(data));
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

function complexOperation(data) {
  return new Proxy(data, {
    get(target, prop, receiver) {
      if (prop in target) {
        return target[prop];
      }
      console.warn(`Property ${prop} not found!`);
      return null;
    },
    set(target, prop, value) {
      print(`Setting ${prop} to ${value}`);
      target[prop] = value;
      return true;
    }
  });
}

(async () => {
  const observable = new Observable();
  
  const unsubscribe = observable.subscribe((data) => {
    print("Data received:", data);
  });
  
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    const proxyData = complexOperation(data);
    
    observable.notify(proxyData);
    
    proxyData.title = "Updated Title";
    print(proxyData.unknownProp);   

    unsubscribe();   
  } catch (error) {
    console.error(error);
  }
})();
