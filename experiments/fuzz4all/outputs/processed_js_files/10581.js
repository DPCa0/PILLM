 
async function* dataStreamSimulator() {
  for (let i = 0; i < 10; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield i;
  }
}

 
const target = { message: "Hello, world!" };
const handler = {
  get: (obj, prop) => {
    if (prop === 'message') {
      return `Modified: ${obj[prop]}`;
    }
    return obj[prop];
  }
};
const proxy = new Proxy(target, handler);

 
async function processStreamAndMessage() {
  print(proxy.message);
  
  for await (const data of dataStreamSimulator()) {
    print(`Received data: ${data}`);
  }
}

 
async function runTasks() {
  const tasks = [
    fetch('https://jsonplaceholder.typicode.com/posts/1'),
    fetch('https://jsonplaceholder.typicode.com/posts/2'),
    fetch('https://jsonplaceholder.typicode.com/posts/3')
  ];

  const results = await Promise.allSettled(tasks);
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      result.value.json().then(data => print(data));
    } else {
      console.error('Failed to fetch:', result.reason);
    }
  });
}

 
(async () => {
  await processStreamAndMessage();
  await runTasks();
})();
