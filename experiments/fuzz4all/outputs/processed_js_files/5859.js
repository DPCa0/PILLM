 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { message: `Data from ${url}` };
      if (url) resolve(data);
      else reject('No URL provided');
    }, 1000);
  });
}

 
async function getData() {
  try {
    const result = await fetchData('https://api.example.com');
    print(result.message);
  } catch (error) {
    console.error(error);
  }
}

 
const target = {
  greeting: 'Hello, Proxy!',
  repeat: function (message) {
    return `${message} ${message}`;
  }
};

const handler = {
  get(target, property) {
    print(`Property '${property}' accessed.`);
    return target[property];
  },
  apply(target, thisArg, argumentsList) {
    print(`Function '${target.name}' called with arguments:`, argumentsList);
    return target.apply(thisArg, argumentsList);
  }
};

const proxy = new Proxy(target, handler);

 
print(proxy.greeting);  
print(proxy.repeat('Echo'));  

 
getData();
