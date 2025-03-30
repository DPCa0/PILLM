 
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: [randomInt(1, 100), randomInt(1, 100), randomInt(1, 100)] });
    }, 1000);
  });
};

 
function* dataProcessor(data) {
  for (const item of data) {
    yield item * 2;  
  }
}

 
(async () => {
  try {
    print("Fetching data...");
    const response = await fetchData();
    print("Data fetched:", response.data);

     
    const generator = dataProcessor(response.data);
    for (const value of generator) {
      print("Processed value:", value);
    }

     
    const uniqueValues = [...new Set(response.data)];
    print("Unique data values:", uniqueValues);

     
    const dataProxy = new Proxy(response.data, {
      get(target, prop) {
        if (prop in target) {
          print(`Accessing data at index ${prop}:`, target[prop]);
          return target[prop];
        } else {
          throw new Error(`Property ${prop} does not exist on target`);
        }
      },
    });

    print("Accessing data via Proxy:", dataProxy[1]);

  } catch (error) {
    console.error("An error occurred:", error.message);
  }
})();
