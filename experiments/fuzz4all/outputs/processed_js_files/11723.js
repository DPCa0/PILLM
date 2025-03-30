 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: { user: "John Doe", age: 30, location: "NYC" } });
      } else {
        reject("Invalid URL");
      }
    }, 1000);
  });
}

 
async function getData(url) {
  try {
    const { data: { user, ...details } } = await fetchData(url);  
    print(`User: ${user}`);
    processData({ user, ...details });  
  } catch (error) {
    console.error(error);
  }
}

 
function processData(data) {
  const handler = {
    get: (obj, prop) => {
      return prop in obj ? obj[prop] : `No such property: ${prop}`;
    },
  };
  const proxyData = new Proxy(data, handler);

  print(`Age: ${proxyData.age}`);
  print(`Location: ${proxyData.location}`);
  print(`Job: ${proxyData.job}`);  
}

 
getData("https://api.example.com/data");
