 
async function* fetchData(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      yield data;
    } else {
      yield { error: `Failed to fetch data from ${url}` };
    }
  }
}

 
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

 
const handler = {
  get(target, property) {
    print(`Accessing property: ${property}`);
    return target[property];
  },
};

 
const user = {
  name: 'Alice',
  age: 30,
};

const proxiedUser = new Proxy(user, handler);

 
async function delayedLog(message, delay) {
  await new Promise(resolve => setTimeout(resolve, delay));
  print(message);
}

 
(async () => {
   
  const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2'];
  for await (const data of fetchData(urls)) {
    print(data);
  }

   
  const debouncedLog = debounce((msg) => print(msg), 1000);
  debouncedLog("This message will be logged after 1 second");

   
  print(proxiedUser.name);  

   
  await delayedLog('This message is delayed by 2 seconds', 2000);
})();
