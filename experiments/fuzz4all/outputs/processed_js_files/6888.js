 

 
const fetchData = () => new Promise((resolve) => setTimeout(() => resolve("Fetched Data"), 1000));

 
async function* dataGenerator() {
  let data = await fetchData();
  yield data;
  data = await fetchData();
  yield data;
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessed property: ${prop}, Value: ${target[prop]}`);
      return target[prop];
    } else {
      throw new Error(`Property ${prop} does not exist`);
    }
  }
};

const run = async () => {
  const gen = dataGenerator();
  let result = await gen.next();
  
   
  const proxiedData1 = new Proxy({ value: result.value }, handler);
  print(proxiedData1.value);

  result = await gen.next();
  const proxiedData2 = new Proxy({ value: result.value }, handler);
  print(proxiedData2.value);
};

 
run();
