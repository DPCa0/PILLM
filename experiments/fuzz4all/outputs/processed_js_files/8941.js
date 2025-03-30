 

 
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { message: 'Hello, world!', timestamp: new Date() };
      Math.random() > 0.1 ? resolve(data) : reject('Fetch failed');
    }, 1000);
  });
}

 
async function processData() {
  try {
    const data = await fetchData();
    print(`Fetched data: ${JSON.stringify(data)}`);
    return data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

 
const handler = {
  get(target, prop) {
    if (prop === 'formattedDate') {
      return new Date(target.timestamp).toLocaleString();
    }
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
(async function main() {
  const rawData = await processData();
  if (rawData) {
    const proxiedData = new Proxy(rawData, handler);

     
    print(`Message: ${proxiedData.message}`);
    print(`Timestamp: ${proxiedData.formattedDate}`);

     
    proxiedData.message = 'Hello, Proxy!';
    print(`Updated Message: ${proxiedData.message}`);
  }
})();
