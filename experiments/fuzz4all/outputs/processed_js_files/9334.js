 

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

 
class Utils {
  static log(message) {
    print(`Log: ${message}`);
  }
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      Utils.log(`Property '${prop}' accessed`);
      return target[prop];
    } else {
      throw new ReferenceError(`Property '${prop}' not found`);
    }
  },
};

const user = { name: 'Alice', age: 30 };
const proxyUser = new Proxy(user, handler);

(async () => {
  try {
     
    print(proxyUser.name);
    
     
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    Utils.log(JSON.stringify(data));
  } catch (error) {
    console.error('Error:', error);
  }
})();
