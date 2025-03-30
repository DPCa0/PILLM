 

 
async function fetchData() {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: 'Sample Data from API' }), 1000)
  );
}

 
function* dataGenerator() {
  yield 'Processing Step 1';
  yield 'Processing Step 2';
  yield 'Processing Step 3';
  yield 'Processing Step 4';
}

 
const handler = {
  get: function (target, property) {
    print(`Property '${property}' has been accessed.`);
    return target[property];
  },
  set: function (target, property, value) {
    print(`Property '${property}' has been set to '${value}'.`);
    target[property] = value;
    return true;
  },
};

 
const data = { info: 'Initial Info' };
const proxiedData = new Proxy(data, handler);

 
(async () => {
  print('Starting program...');

   
  const generator = dataGenerator();
  for (const step of generator) {
    print(step);
  }

   
  const apiData = await fetchData();
  print('Fetched:', apiData.data);
  proxiedData.info = apiData.data;

   
  print('Final data:', proxiedData.info);
})();
