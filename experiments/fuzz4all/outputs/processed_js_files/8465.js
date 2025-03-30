 

 
function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, Math.random() * 1000);
  });
}

 
async function fetchAllData(urls) {
  const results = [];
  for (let url of urls) {
    const data = await fetchData(url);
    results.push(data);
  }
  return results;
}

 
function* createTasks(urls) {
  for (let url of urls) {
    yield fetchData(url);
  }
}

 
const loggerHandler = {
  get: function (target, property) {
    print(`Accessing property "${property}"`);
    return target[property];
  }
};

 
(async () => {
  const urls = ['https://api.site1.com', 'https://api.site2.com', 'https://api.site3.com'];

   
  const allData = await fetchAllData(urls);
  print('Fetched data using async/await:', allData);

   
  const tasks = createTasks(urls);
  for (let task of tasks) {
    const result = await task;
    print('Fetched data using generator:', result);
  }

   
  const user = new Proxy({ name: 'John Doe', age: 30 }, loggerHandler);
  print(user.name);
  print(user.age);
})();
