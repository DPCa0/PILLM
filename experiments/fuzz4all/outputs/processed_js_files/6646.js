 
async function complexOperation() {
  const simulateAsyncProcess = (val, delay) =>
    new Promise(resolve => setTimeout(() => resolve(val), delay));

  const fetchData = async () => {
    const [data1, data2] = await Promise.all([
      simulateAsyncProcess({ id: 1, value: 'Alpha' }, 1000),
      simulateAsyncProcess({ id: 2, value: 'Beta' }, 2000)
    ]);
    return { data1, data2 };
  };

  const processResults = ({ data1: { value: val1 }, data2: { value: val2 } }) => {
    return `Processed Results: ${val1.toUpperCase()} & ${val2.toUpperCase()}`;
  };

  try {
    const results = await fetchData();
    print(processResults(results));
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

 
const complexObjectHandler = {
  get(target, property) {
    if (property in target) {
      return target[property];
    } else {
      return `Property ${String(property)} doesn't exist on target`;
    }
  },
  set(target, property, value) {
    print(`Setting value ${value} to property ${String(property)}`);
    target[property] = value;
    return true;
  }
};

const targetObject = { [Symbol('hidden')]: 'secret', visible: 'exposed' };
const proxiedObject = new Proxy(targetObject, complexObjectHandler);

(async () => {
  await complexOperation();
  print(proxiedObject.visible);
  proxiedObject.newProperty = 'I am new';
  print(proxiedObject.newProperty);
  print(proxiedObject.nonExistentProperty);
})();
