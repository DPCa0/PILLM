 

 
function* numberGenerator(max) {
  let num = 0;
  while (num <= max) {
    yield num++;
  }
}

 
const timeoutPromise = () => new Promise(resolve => {
  const delay = Math.floor(Math.random() * 1000) + 500;
  setTimeout(() => resolve(`Completed after ${delay}ms`), delay);
});

 
async function processNumbers(max) {
  const generator = numberGenerator(max);
  for (let num of generator) {
    const { value } = await timeoutPromise();
    print(`Processed number: ${num}, Result: ${value}`);
  }
  print('All numbers processed.');
}

 
const settings = { threshold: 10, retries: 3 };
const { threshold = 5, retries = 2 } = settings;

 
print(`Starting processing with threshold: ${threshold} and retries: ${retries}`);
processNumbers(threshold);
