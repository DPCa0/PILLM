 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 1000);
  });
};

 
const arrayHandler = {
  get(target, prop, receiver) {
    if (prop === 'sum') {
      return target.reduce((acc, val) => acc + val, 0);
    }
    return Reflect.get(target, prop, receiver);
  },
};

 
const processData = async () => {
  const { data } = await fetchData();
  const proxiedData = new Proxy(data, arrayHandler);
  
  print(`Original data: [${[...proxiedData]}]`);
  print(`Sum of elements: ${proxiedData.sum}`);

  const [first, second, ...rest] = proxiedData;
  const modifiedData = [...rest, first * 2, second * 2];

  print(`Modified data: [${modifiedData}]`);
};

 
(async () => {
  try {
    await processData();
  } catch (error) {
    console.error('Error processing data:', error);
  }
})();
