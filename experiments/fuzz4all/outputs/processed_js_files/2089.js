 

 
function getRandomData() {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 2000) + 500;
    setTimeout(() => resolve(`Data received after ${delay}ms`), delay);
  });
}

 
async function fetchData() {
  print("Fetching data...");
  const data = await getRandomData();
  print("Processing:", data);
  return data.toUpperCase();
}

 
const loggingHandler = {
  get(target, property) {
    print(`Accessed property: ${property}`);
    return target[property];
  }
};

 
const config = new Proxy(
  {
    setting1: true,
    setting2: "default",
    setting3: 42,
  },
  loggingHandler
);

 
function* configGenerator() {
  for (let key of Object.keys(config)) {
    yield config[key];
  }
}

 
(async function runExample() {
   
  const processedData = await fetchData();
  print("Processed Data:", processedData);

   
  print("Config setting1:", config.setting1);

   
  const generator = configGenerator();
  for (let value of generator) {
    print("Generator yielded:", value);
  }
})();
