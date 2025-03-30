const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }
  
  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const createProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Accessing property ${prop}`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Setting property ${prop} to ${value}`);
      obj[prop] = value;
      return true;
    }
  });
};

 

(async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  if (data) {
    const emitter = new EventEmitter();
    
    emitter.on('dataFetched', (data) => {
      print('Data fetched:', data);
    });

    const proxyData = createProxy(data);
    emitter.emit('dataFetched', proxyData);
    
    print(proxyData.title);  
    proxyData.title = 'Updated Title';  
    print(proxyData.title);  
  }
})();
