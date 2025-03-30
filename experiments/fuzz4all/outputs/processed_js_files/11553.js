 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}

const processData = async (url) => {
  const dataFetcher = new DataFetcher(url);
  try {
    const data = await dataFetcher.fetchData();
    const [{ name, age }, ...others] = data;
    print(`Name: ${name}, Age: ${age}`);
    print('Other data:', others);
  } catch (error) {
    console.error('Processing error:', error);
  }
};

const url = 'https://jsonplaceholder.typicode.com/users';
processData(url);

 

const targetObj = {
  greet: 'Hello',
  planet: 'Earth'
};

const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      return `Property ${prop} not found`;
    }
  },
  set(target, prop, value) {
    if (prop === 'greet') {
      print(`Cannot modify '${prop}'`);
      return false;
    }
    target[prop] = value;
    return true;
  }
};

const proxyObj = new Proxy(targetObj, handler);

print(proxyObj.greet);  
print(proxyObj.planet);  
print(proxyObj.nonExistentProp);  

proxyObj.greet = 'Hi';  
proxyObj.planet = 'Mars';  

print(proxyObj.planet);  
