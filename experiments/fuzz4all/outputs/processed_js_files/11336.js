 
class ComplexStructure {
  constructor(name, data) {
    this.name = name;
    this.data = data;
  }

   
  *dataIterator() {
    for (let item of this.data) {
      yield item;
    }
  }
}

 
const dataProxyHandler = {
  get: (target, prop, receiver) => {
    print(`Getting property ${prop}`);
    return Reflect.get(...arguments);
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  },
};

 
async function fetchData() {
  let data = await new Promise((resolve) =>
    setTimeout(() => resolve([1, 2, 3, 4, 5]), 1000)
  );
  return data;
}

 
async function initializeComplexStructure() {
  const initialData = await fetchData();
  const [first, ...rest] = initialData;
  const complexObject = new ComplexStructure("MyStructure", rest);

   
  const proxyComplexObject = new Proxy(complexObject, dataProxyHandler);

  return proxyComplexObject;
}

 
initializeComplexStructure().then((complexObj) => {
  print(`Complex Structure Name: ${complexObj.name}`);
  print(`Data Entries:`);
  for (let entry of complexObj.dataIterator()) {
    print(` - ${entry}`);
  }
});
