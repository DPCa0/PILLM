 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function* streamData() {
  let count = 0;
  while (count < 5) {
    await delay(1000);  
    yield `Data chunk ${++count}`;
  }
}

 
const loggingHandler = {
  get(target, prop) {
    print(`Accessing property "${prop}"`);
    return target[prop];
  }
};

 
const proxyStreamData = new Proxy(streamData(), loggingHandler);

 
async function processData() {
  for await (const data of proxyStreamData) {
    print(`Received: ${data}`);
  }
  print('Data stream processing complete.');
}

 
processData();
