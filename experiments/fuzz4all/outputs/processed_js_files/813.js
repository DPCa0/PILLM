 

const handler = {
  get(target, property) {
    if (property in target) {
      print(`Getting property ${property}`);
      return Reflect.get(target, property);
    }
    print(`Property ${property} does not exist.`);
    return 'default';
  },
  set(target, property, value) {
    print(`Setting property ${property} to ${value}`);
    return Reflect.set(target, property, value);
  }
};

const data = {
  name: 'Alice',
  age: 25,
  async fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ location: 'Wonderland', occupation: 'Explorer' }), 1000);
    });
  }
};

const proxyData = new Proxy(data, handler);

(async () => {
  const { name, age, fetchData } = proxyData;
  
  print(`Name: ${name}`);
  print(`Age: ${age}`);
  
  try {
    const additionalData = await fetchData();
    const { location, occupation } = additionalData;
    print(`Location: ${location}`);
    print(`Occupation: ${occupation}`);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
  
  proxyData.name = 'Bob';
  print(`Updated Name: ${proxyData.name}`);
  
  print(`Non-existing property: ${proxyData.hobby}`);
})();
