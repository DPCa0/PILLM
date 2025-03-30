(async () => {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

   
  const dataHandler = {
    get(target, property) {
      print(`Getting ${property}`);
      return target[property];
    },
    set(target, property, value) {
      print(`Setting ${property} to ${value}`);
      target[property] = value;
      return true;
    },
  };

   
  const privateData = new WeakMap();

  class ComplexDataStructure {
    constructor(data) {
      const proxyData = new Proxy(data, dataHandler);
      privateData.set(this, proxyData);
    }

    get data() {
      return privateData.get(this);
    }

    async fetchDataAndMerge(url) {
      try {
        const externalData = await fetchData(url);
        Object.assign(this.data, externalData);
        print('Data merged:', this.data);
      } catch (error) {
        console.error('Fetching data failed:', error);
      }
    }
  }

   
  const initialData = { name: 'Initial', value: 42 };
  const complexData = new ComplexDataStructure(initialData);

  print('Before merge:', complexData.data);
  await complexData.fetchDataAndMerge('https://jsonplaceholder.typicode.com/todos/1');
  print('After merge:', complexData.data);
})();
