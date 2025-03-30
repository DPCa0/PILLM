 
const fs = require('fs').promises;

 
async function* fetchData() {
  for (let i = 0; i < 3; i++) {
     
    await new Promise(resolve => setTimeout(resolve, 100));
    yield `Data chunk ${i + 1}`;
  }
}

 
async function handleData() {
  const fileHandle = await fs.open('output.txt', 'w');
  const writeStream = fileHandle.createWriteStream();

  try {
    for await (const chunk of fetchData()) {
      print(`Processing: ${chunk}`);
      writeStream.write(`${chunk}\n`);   
    }
  } finally {
    writeStream.end();
    await fileHandle.close();
  }
}

 
const targetObject = { a: 1, b: 2, c: 3 };
const handler = {
  get: (target, prop, receiver) => {
    print(`Property ${prop} was accessed`);
    return Reflect.get(...arguments);
  }
};

const proxy = new Proxy(targetObject, handler);

 
print(proxy.a);
print(proxy.b);

 
handleData().catch(console.error);
