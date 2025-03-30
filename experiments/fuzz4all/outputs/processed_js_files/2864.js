 

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'cherry']);
    }, 1000);
  });
}

 
function* processItems(items) {
  for (const item of items) {
    yield `Item: ${item.toUpperCase()}`;
  }
}

 
const targetObject = {
  logMessage(message) {
    print(`Logging: ${message}`);
  }
};

const handler = {
  get(target, property) {
    if (property === 'logMessage') {
      return function(...args) {
        print(`Called method: ${property}`);
        return target[property].apply(target, args);
      };
    }
    return target[property];
  }
};

const proxy = new Proxy(targetObject, handler);

(async function main() {
  const data = await fetchData();
  const processedData = processItems(data);
  
  proxy.logMessage('Data fetched and processing started.');
  
  for (const item of processedData) {
    proxy.logMessage(item);
  }
})();
