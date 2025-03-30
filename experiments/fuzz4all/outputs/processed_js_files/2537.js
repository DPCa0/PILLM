 

 
const fetchData = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `Item ${id}`, value: Math.random() * 100 });
    }, 1000 * Math.random());
  });
};

 
const processItems = async (ids) => {
  try {
    const results = await Promise.all(ids.map(async (id) => {
      const data = await fetchData(id);
      return { ...data, processedValue: data.value.toFixed(2) };
    }));

    const finalResult = results.reduce((acc, item) => {
      acc[item.id] = item.processedValue;
      return acc;
    }, {});

    print('Final Processed Data:', finalResult);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

 
const targetObject = { a: 1, b: 2 };
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property "${prop}" with value ${target[prop]}`);
      return target[prop];
    }
    throw new Error(`Property "${prop}" does not exist.`);
  },
  set: (target, prop, value) => {
    print(`Setting property "${prop}" to ${value}`);
    target[prop] = value;
    return true;
  }
};

const proxy = new Proxy(targetObject, handler);

 
proxy.a;  
proxy.c = 3;  

 
(async () => {
  await processItems([1, 2, 3, 4, 5]);
})();
