 

 
function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), 1000);
  });
}

 
function* createSequence() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
const sequenceHandler = {
  get: (target, prop) => {
    if (prop === 'nextId') {
      return target.next().value;
    }
    return target[prop];
  }
};

 
const sequenceGenerator = createSequence();
const sequence = new Proxy(sequenceGenerator, sequenceHandler);

 
async function processData(url) {
  const id = sequence.nextId;
  print(`Processing request ${id}`);
  const data = await fetchData(url);
  print(`Request ${id} completed with data: ${data}`);
}

 
async function main() {
  const urls = ['https://api.example.com/1', 'https://api.example.com/2', 'https://api.example.com/3'];
  await Promise.all(urls.map(url => processData(url)));
  print('All requests processed');
}

 
main();
