 

const getData = () =>
  new Promise((resolve) => setTimeout(() => resolve([1, 2, 3, 4, 5]), 1000));

const processItem = (item) => new Promise((resolve) =>
  setTimeout(() => resolve(item * 2), 500)
);

const runProgram = async () => {
  print("Fetching data...");
  const data = await getData();
  
  print("Processing data...");
  const promises = data.map(async (item) => {
    const result = await processItem(item);
    return result;
  });
  
  const processedData = await Promise.all(promises);
  print("Processed Data:", ...processedData);

   
  const [first, second, ...rest] = processedData;
  print(`First: ${first}, Second: ${second}, Rest: ${rest.join(", ")}`);
};

runProgram();
