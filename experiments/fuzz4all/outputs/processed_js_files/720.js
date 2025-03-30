 
const fetchWithTimeout = (url, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Request timed out')), timeout);
    fetch(url)
      .then(response => {
        clearTimeout(timer);
        resolve(response.json());
      })
      .catch(err => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Property '${prop}' was accessed.`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Property '${prop}' was set to ${value}.`);
      obj[prop] = value;
      return true;
    }
  });
};

 
async function* asyncGeneratorExample() {
  yield await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1');
  yield await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/2');
}

 
(async () => {
   
  const person = createLoggingProxy({ name: 'Alice', age: 30 });
  print(person.name);   
  person.age = 31;            

   
  try {
    for await (const data of asyncGeneratorExample()) {
      print(data);
    }
  } catch (error) {
    console.error(error);
  }
})();
