 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: { userId: 1, title: 'JavaScript Magic', completed: true } });
    }, 1000);
  });
};

 
function* dataProcessor(data) {
  yield `Processed Title: ${data.title.toUpperCase()}`;
  yield `Status: ${data.completed ? 'Completed' : 'Pending'}`;
}

 
const handler = {
  get: (target, property) => {
    print(`Getting property: ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
(async function main() {
  try {
    const response = await fetchData();
    const proxyResponse = new Proxy(response.data, handler);

    print(`User ID: ${proxyResponse.userId}`);

    const processor = dataProcessor(proxyResponse);
    print(processor.next().value);  
    print(processor.next().value);  

    Reflect.set(proxyResponse, 'completed', false);
    print(`Updated Status: ${proxyResponse.completed}`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
