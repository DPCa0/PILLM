 
async function* fetchData() {
  const data = ["apple", "banana", "cherry"];
  for (let item of data) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield item.toUpperCase();
  }
}

 
const handler = {
  get(target, property, receiver) {
    if (property in target) {
      print(`Accessing property: ${property}`);
      return Reflect.get(target, property, receiver);
    }
    return `Property ${property} does not exist`;
  }
};

 
const complexObject = new Proxy({ message: "Hello, Proxy!" }, handler);

 
const performOperations = async () => {
  const asyncIterable = fetchData();
  
   
  print(complexObject.message);
  
  const results = await Promise.allSettled([
    asyncIterable.next(),
    asyncIterable.next(),
    asyncIterable.next(),
    Promise.reject('Forced error')
  ]);

   
  const filteredResults = new Set(results
    .filter(({ status }) => status === 'fulfilled')
    .map(({ value }) => value.value)
  );

  const resultMap = new Map();
  filteredResults.forEach((item, index) => {
    resultMap.set(index, item);
  });

   
  for (const [index, value] of resultMap.entries()) {
    print(`Item ${index}: ${value}`);
  }
};

 
performOperations().catch(err => console.error('Operation error:', err));
