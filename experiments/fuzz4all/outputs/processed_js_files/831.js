 

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const ids = idGenerator();

 
const handler = {
  get: (target, prop) => {
    if (prop === 'nextId') {
      return ids.next().value;
    }
    return target[prop];
  },
};

const obj = new Proxy({}, handler);

 
async function fetchDataWithProcessing() {
   
  const fetchData = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: 'Sample Data', id: obj.nextId });
      }, 1000);
    });

  try {
    const data = await fetchData();
    print(`Fetched data: ${data.data} with ID: ${data.id}`);
    
    const processedData = await processData(data);
    print(`Processed data: ${processedData}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

 
async function processData(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${data.data} - Processed`);
    }, 1000);
  });
}

 
fetchDataWithProcessing();
