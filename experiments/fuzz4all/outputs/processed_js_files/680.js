 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
}

 
function processData({ name, age, ...rest }) {
  return { name, age, info: { ...rest } };
}

 
function* sequenceGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

 
const delayedPromise = (delay) => new Promise(resolve => setTimeout(resolve, delay));

 
(async function main() {
  try {
    const dataUrl = 'https://jsonplaceholder.typicode.com/users/1';
    const userData = await fetchData(dataUrl);

    const processedData = processData(userData);
    print("Processed Data:", processedData);

    const seqGen = sequenceGenerator(1, 5);
    print("Generated Sequence:", [...seqGen]);

    await delayedPromise(1000);   
    print("After 1 second delay");

  } catch (error) {
    console.error("An error occurred:", error.message);
  }
})();
