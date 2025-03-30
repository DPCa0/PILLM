 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'cherry']);
    }, 1000);
  });
}

 
function* processItems(items) {
  for (let item of items) {
    yield `Processing: ${item}`;
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      return `Property ${prop} not found`;
    }
  },
};

 
(async function main() {
   
  const data = await fetchData();
  
   
  const targetObject = {
    name: "Fruit Processor",
    status: "Active",
  };
  
  const proxy = new Proxy(targetObject, handler);

  print(proxy.name);  
  print(proxy.nonExistentProp);  

   
  const itemProcessor = processItems(data);

  for (let message of itemProcessor) {
    print(message);  
  }
})();
