 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
const createLogger = (obj) => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      print(`GET: ${String(prop)}`);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      print(`SET: ${String(prop)} = ${value}`);
      return Reflect.set(target, prop, value, receiver);
    }
  });
};

 
async function* fetchData(urls) {
  for (let url of urls) {
    await delay(1000);  
    yield fetch(url).then(response => response.json());
  }
}

 
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2'
];

 
(async () => {
  let logger = createLogger({status: "pending"});

   
  logger.status = "fetching";

  for await (const data of fetchData(urls)) {
    logger.data = data;   
    print('Fetched:', data);
  }

   
  logger.status = "complete";
})();
