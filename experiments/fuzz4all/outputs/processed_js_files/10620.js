 
async function* fetchData(urls) {
  for (let url of urls) {
     
    const response = await fetch(url);
    yield response.json();
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting property: ${prop}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

const target = { message: "Hello, Proxy!" };
const proxy = new Proxy(target, handler);

 
async function processUrls(urls) {
  const fetchGenerator = fetchData(urls);
  const data = [];

  for await (const json of fetchGenerator) {
    data.push(json);
  }
  
  print("Fetched data:", data);
}

 
(async () => {
  proxy.message = "Proxy in action!";
  print(proxy.message);

   
  const urls = ['https://jsonplaceholder.typicode.com/todos/1', 
                'https://jsonplaceholder.typicode.com/todos/2'];

  try {
    await processUrls(urls);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
