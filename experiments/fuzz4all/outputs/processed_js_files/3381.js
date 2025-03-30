 
async function* fetchData(urls) {
  for (const url of urls) {
     
    const response = await fetch(url);
    const data = await response.json();
    yield data;
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property "${prop}" with value:`, target[prop]);
    return target[prop];
  }
};

const user = new Proxy({ name: "Alice", age: 30 }, handler);

 
const uniqueUrls = new Set([
  "https://api.example.com/data1",
  "https://api.example.com/data2",
]);

(async () => {
   
  const responses = await Promise.all([...fetchData(uniqueUrls)]);
  print('Fetched data:', responses);

   
  print('User name:', user.name);
  print('User age:', user.age);
})();
