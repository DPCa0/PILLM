 

 
function* dataPipeline() {
  yield fetchData('https://jsonplaceholder.typicode.com/posts/1');
  yield processData('Process Step 1');
  yield fetchData('https://jsonplaceholder.typicode.com/posts/2');
  yield processData('Process Step 2');
  yield fetchData('https://jsonplaceholder.typicode.com/posts/3');
  yield processData('Process Step 3');
}

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    print('Fetched Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
async function processData(step) {
  return new Promise((resolve) => {
    setTimeout(() => {
      print(step, 'completed');
      resolve(step);
    }, 1000);
  });
}

 
async function runPipeline(pipeline) {
  for (let step of pipeline) {
    await step;
  }
}

 
const pipeline = dataPipeline();
runPipeline(pipeline);
