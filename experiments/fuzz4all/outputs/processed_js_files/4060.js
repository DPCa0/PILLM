 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData() {
  await delay(1000);  
  return { id: 1, data: 'Sample Data' };
}

 
function* dataGenerator(dataArray) {
  for (let item of dataArray) {
    yield item;
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Getting property ${property}`);
    return target[property];
  }
};

 
(async function main() {
  const dataArray = await fetchData();
  const proxiedData = new Proxy(dataArray, handler);
  const generator = dataGenerator([proxiedData]);

  for (let data of generator) {
    print(`Data ID: ${data.id}, Data: ${data.data}`);
  }
})();
