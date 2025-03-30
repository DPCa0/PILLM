 

 
function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

 
const logger = {
  get: (target, prop) => {
    print(`Accessing property: ${prop}`);
    return prop in target ? target[prop] : null;
  }
};

 
async function fetchData() {
  const dataPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data fetched!'), 2000);
  });

  print('Fetching data...');
  const data = await dataPromise;
  print(data);
}

 
const sequence = infiniteSequence();
const proxiedSequence = new Proxy(sequence, logger);

 
fetchData().then(() => {
   
  print(proxiedSequence.next().value);  
  print(proxiedSequence.next().value);  
});
