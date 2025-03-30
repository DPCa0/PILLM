 

 
function fetchDataBatch(batchNumber) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([`Data from batch ${batchNumber}`, `More data from batch ${batchNumber}`]);
    }, Math.random() * 1000);
  });
}

 
async function* dataStream() {
  let batchNumber = 1;
  while (batchNumber <= 5) {  
    const dataBatch = await fetchDataBatch(batchNumber);
    yield dataBatch;
    batchNumber++;
  }
}

 
(async () => {
  const results = [];
  for await (const batch of dataStream()) {
    const processedBatch = batch.map((data) => data.toUpperCase());
    results.push(...processedBatch);
    print(`Processed: ${processedBatch}`);
  }
  print('Final processed results:', results);
})();
