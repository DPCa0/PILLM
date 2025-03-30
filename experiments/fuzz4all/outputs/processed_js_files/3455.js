 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* processTasks(tasks) {
  for (const task of tasks) {
    const result = await task();
    yield result;
  }
}

 
const fetchData = async id => {
  await delay(500);  
  if (Math.random() > 0.5) throw new Error(`Failed to fetch data for ID: ${id}`);
  return `Data for ID: ${id}`;
};

 
const tasks = Array.from({ length: 5 }, (_, i) => () => fetchData(i));

 
(async () => {
  const results = [];
  
  for await (const result of processTasks(tasks)) {
    results.push(result);
  }
  
  print('Results:', results);
})().catch(error => console.error('Error:', error.message));
