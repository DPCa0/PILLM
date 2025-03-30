 

 
const mockApiCall = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: { value: 42 } }), 1000)
  );

 
function* numberGenerator() {
  let number = 1;
  while (true) {
    yield number++;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting property '${prop}'`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property '${prop}' to '${value}'`);
    return Reflect.set(target, prop, value, receiver);
  },
};

const dataObject = new Proxy({}, handler);

 
async function main() {
   
  print("Fetching data from mock API...");
  const response = await mockApiCall();
  print(`Received data: ${JSON.stringify(response.data)}`);
  
   
  dataObject.value = response.data.value;
  print(`Data value from Proxy: ${dataObject.value}`);

   
  const generator = numberGenerator();
  print("Generator output:", generator.next().value);
  print("Generator output:", generator.next().value);
}

main().catch(console.error);
