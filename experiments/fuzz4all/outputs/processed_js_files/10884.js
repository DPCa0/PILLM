 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* dataGenerator() {
  let id = 0;
  while (true) {
    yield { id: ++id, value: `Data${id}` };
  }
}

 
async function processData(data) {
  print(`Processing ${data.value}...`);
  await delay(1000);   
  return `${data.value} processed`;
}

 
async function run() {
  const generator = dataGenerator();
  let data;

   
  const processedSet = new Set();

   
  for (let i = 0; i < 5; i++) {
    data = generator.next().value;
    const result = await processData(data);
    processedSet.add(result);
  }

  print('Processed Data Set:', processedSet);
}

 
(async () => {
  try {
    await run();
  } catch (error) {
    console.error('Error:', error);
  }
})();
