 

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: [1, 2, 3, 4, 5] });
    }, 1000);
  });
}

 
const handler = {
  get: (target, prop) => {
    print(`Getting ${prop}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

async function processData() {
  const response = await fetchData();
  const proxiedData = new Proxy(response, handler);

   
  const { data, ...rest } = proxiedData;
  print('Remaining properties:', rest);

   
  const processedData = [...data].map((num) => num * 2);

   
  function logWithTemplate(strings, ...values) {
    print(strings.raw[0], ...values);
  }

  logWithTemplate`Processed Data: ${processedData}`;

   
  function* dataGenerator(arr) {
    for (const item of arr) {
      yield item;
    }
  }

  const generator = dataGenerator(processedData);
  for (const value of generator) {
    print('Generated value:', value);
  }

   
  const simulateAsyncOp = (num) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(num + 1), 500);
    });

  const promises = processedData.map((num) => simulateAsyncOp(num));
  const incrementedData = await Promise.all(promises);
  print('Incremented Data:', incrementedData);
}

processData().catch((err) => console.error(err));
