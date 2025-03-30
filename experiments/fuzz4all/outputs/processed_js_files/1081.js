 

 
const fetchData = (data) => 
  new Promise((resolve) => setTimeout(() => resolve(data), 1000));

 
function* dataFlow() {
  const data1 = yield fetchData("First Piece of Data");
  print(`Received: ${data1}`);

  const data2 = yield fetchData("Second Piece of Data");
  print(`Received: ${data2}`);
  
  return { data1, data2 };
}

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property ${prop}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
async function main() {
   
  const dataStore = new Proxy({ data1: "", data2: "" }, handler);

   
  const generator = dataFlow();

   
  let next = generator.next();
  while (!next.done) {
    const data = await next.value;
    next = generator.next(data);
  }

   
  const { data1, data2 } = next.value;

   
  dataStore.data1 = data1;
  dataStore.data2 = data2;

  print('Final Data Store:', dataStore);
}

 
main();
