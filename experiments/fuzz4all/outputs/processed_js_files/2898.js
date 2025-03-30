 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function complexProcess() {
   
  let nums = [1, 2, 3, 4, 5];
  let [first, second, ...rest] = nums;
  
  print(`First: ${first}, Second: ${second}`);
  print(`Rest of the numbers: ${rest}`);
  
   
  let squares = nums.map(x => x ** 2);
  let uniqueSquares = new Set(squares);
  print(`Unique squares: ${[...uniqueSquares]}`);
  
   
  await Promise.all([delay(500), delay(1000)]);
  
   
  const handler = {
    get: (obj, prop) => prop in obj ? obj[prop] : `Property ${prop} is not found`
  };
  
  const data = new Proxy({name: 'JavaScript', type: 'Language'}, handler);
  print(data.name);
  print(data.year);   
  
   
  async function* generateAsyncSequence() {
    yield 'First message';
    await delay(500);
    yield 'Second message';
  }
  
  for await (let message of generateAsyncSequence()) {
    print(message);
  }
}

 
complexProcess()
  .then(() => console.log('Complex process completed'))
  .catch(err => console.error('Error:', err));
