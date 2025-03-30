 

 
const _data = Symbol('data');

 
const handler = {
  get(target, prop) {
    if (prop === 'getData') {
      return target[_data];
    }
    return Reflect.get(...arguments);
  },
  set(target, prop, value) {
    if (prop === 'setData') {
      target[_data] = value;
      return true;
    }
    return Reflect.set(...arguments);
  }
};

 
const dataObject = {
  [_data]: [],
  loadData: async function(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      this.setData = data;
      print('Data loaded:', this.getData);
    } catch (error) {
      console.error('Fetching error:', error);
    }
  }
};

 
const proxyObject = new Proxy(dataObject, handler);

 
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';  
proxyObject.loadData(apiUrl);

 
setTimeout(() => {
  print('First post title:', proxyObject.getData[0]?.title || 'No data');
}, 2000);
