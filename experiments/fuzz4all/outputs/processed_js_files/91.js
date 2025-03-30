 

 
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'Hello, Advanced JavaScript!' });
    }, 1000);
  });
}

 
async function getData() {
  const response = await fetchData();
  return response.data;
}

 
function* dataProcessor(data) {
  yield `Processed: ${data}`;
  yield `Another Step: ${data.toUpperCase()}`;
  yield `Final Step: ${data.toLowerCase()}`;
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return function(...args) {
        print(`Calling ${prop} with arguments:`, args);
        return target[prop].apply(target, args);
      };
    } else {
      return Reflect.get(target, prop, receiver);
    }
  }
};

 
(async function main() {
  try {
    const data = await getData();
    const generator = dataProcessor(data);
    const proxyGenerator = new Proxy(generator, handler);

    print(proxyGenerator.next().value);
    print(proxyGenerator.next().value);
    print(proxyGenerator.next().value);
  } catch (error) {
    console.error('Error:', error);
  }
})();
