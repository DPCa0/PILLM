 

 
function mockApiCall(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 
        ? resolve(`Data for ID: ${id}`) 
        : reject(`Error fetching data for ID: ${id}`);
    }, 1000);
  });
}

 
async function fetchData(ids) {
  const results = [];
  for (const id of ids) {
    try {
      const data = await mockApiCall(id);
      results.push(data);
    } catch (error) {
      results.push(error);
    }
  }
  return results;
}

 
const handler = {
  get: (target, property) => {
    print(`Accessed property: ${property}`);
    return Reflect.get(target, property);
  }
};

 
(async () => {
  const ids = [1, 2, 3, 4, 5];
  const data = await fetchData(ids);
  const proxiedData = new Proxy(data, handler);

   
  for (let i = 0; i < proxiedData.length; i++) {
    print(proxiedData[i]);
  }
})();
