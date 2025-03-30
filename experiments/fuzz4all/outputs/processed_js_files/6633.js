 

 
async function* fetchMockData() {
  const data = [
    { id: 1, value: 'Foo' },
    { id: 2, value: 'Bar' },
    { id: 3, value: 'Baz' }
  ];
  for (const item of data) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield item;
  }
}

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Property '${property}' accessed.`);
      return target[property];
    } else {
      print(`Property '${property}' not found, returning default.`);
      return 'default';
    }
  },
  set(target, property, value) {
    print(`Property '${property}' set to '${value}'`);
    target[property] = value;
    return true;
  }
};

const dataProxy = new Proxy({}, handler);

 
Reflect.set(dataProxy, 'configurableProp', 'initialValue');

 
async function main() {
   
  for await (const item of fetchMockData()) {
    print(`Fetched item: ${item.value}`);
  }

   
  print(`Accessing 'configurableProp': ${dataProxy.configurableProp}`);
  print(`Accessing non-existent property: ${dataProxy.nonExistentProp}`);
  dataProxy.newProp = 'New Value';
}

 
main();
