 

function* dataGenerator() {
  yield fetch('https://jsonplaceholder.typicode.com/posts/1');
  yield fetch('https://jsonplaceholder.typicode.com/posts/2');
  yield fetch('https://jsonplaceholder.typicode.com/posts/3');
}

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property '${prop}'`);
      return target[prop];
    }
    console.warn(`Property '${prop}' does not exist`);
    return undefined;
  },
};

async function processData() {
  const gen = dataGenerator();
  for (const promise of gen) {
    const response = await promise;
    const postData = await response.json();
    
    const proxyData = new Proxy(postData, handler);
    const { id, title, body } = proxyData;

    print(`Post ${id}: ${title}`);
    print(`Content: ${body.slice(0, 20)}...`);
  }
}

processData().catch(console.error);
