 

 
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ id: 1, name: "Sample Data" }), 1000);
  });
}

 
async function processData() {
  try {
    const data = await fetchData();
    return { ...data, processed: true };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

 
function* dataGenerator() {
  yield* [1, 2, 3, 4, 5];
}

 
const handler = {
  get(target, property) {
    print(`Accessing property "${property}" with value:`, target[property]);
    return target[property];
  }
};

async function main() {
   
  const processedData = await processData();
  const proxiedData = new Proxy(processedData, handler);

   
  print("ID:", proxiedData.id);
  print("Name:", proxiedData.name);
  print("Processed:", proxiedData.processed);

   
  const gen = dataGenerator();
  for (const value of gen) {
    print("Generated value:", value);
  }
}

main();
