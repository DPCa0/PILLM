 

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property '${prop}'`);
    return target[prop];
  }
};

const obj = new Proxy({ greeting: 'Hello, world!', times: 3 }, handler);

 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { data: `Fetched data from ${url}` };
      resolve(data);
    }, 1000);
  });
}

 
function* greetGenerator(obj) {
  for (let i = 0; i < obj.times; i++) {
    yield obj.greeting;
  }
}

 
async function main() {
  const url = 'https://example.com/api';
  
   
  const data = await fetchData(url);
  print(data.data);
  
   
  const greetings = greetGenerator(obj);
  for (let greet of greetings) {
    print(greet);
  }
}

 
main();
