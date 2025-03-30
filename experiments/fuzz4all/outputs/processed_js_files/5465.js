 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData(url) {
  await delay(1000);
  if (url !== "https://api.example.com/data") {
    throw new Error('Invalid URL');
  }
  return { data: { user: { name: "Alice", age: 30 }, status: "active" } };
}

const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Getting property: ${property}`);
      return target[property];
    } else {
      console.warn(`Property "${property}" does not exist`);
      return undefined;
    }
  },
  set: (target, property, value) => {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

async function main() {
  const url = "https://api.example.com/data";
  try {
    const { data: { user, status } } = await fetchData(url);
    
    const proxyUser = new Proxy(user, handler);
    proxyUser.name = "Bob";
    
    const userSymbol = Symbol('userIdentifier');
    proxyUser[userSymbol] = 'user12345';

    print(`User Name: ${proxyUser.name}, Status: ${status}`);
    print(`User Symbol: ${proxyUser[userSymbol]}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();
