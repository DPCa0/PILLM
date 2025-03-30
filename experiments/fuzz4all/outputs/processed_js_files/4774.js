 

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
  }
}

 
function* createCounter() {
  let i = 0;
  while (true) {
    yield new Promise(resolve => setTimeout(() => resolve(i++), 1000));
  }
}

 
const logHandler = {
  get(target, prop) {
    print(`Property accessed: ${prop}`);
    return target[prop];
  }
};

 
const user = { name: 'Alice', age: 30 };
const proxiedUser = new Proxy(user, logHandler);

 
(async () => {
  const counter = createCounter();
  print(proxiedUser.name);  
  print(proxiedUser.age);   

  for await (const value of counter) {
    print(`Counter value: ${value}`);

     
    if (value >= 5) break;
  }

   
  const data = await fetchData('https://api.github.com/users/octocat');
  print('Fetched Data:', data);
})();
