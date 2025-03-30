 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const dataHandler = {
  get(target, property) {
    if (property in target) {
      print(`Getting ${property}`);
      return Reflect.get(target, property);
    } else {
      print(`Property ${property} not found`);
    }
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    Reflect.set(target, property, value);
    return true;
  }
};

const proxiedData = new Proxy({}, dataHandler);

async function fetchData() {
  print("Fetching data...");
  await delay(2000);
  proxiedData.name = "JavaScript";
  proxiedData.type = "Programming Language";
  
  print(`Data received: ${proxiedData.name}, ${proxiedData.type}`);
  return proxiedData;
}

(async () => {
  try {
    const result = await fetchData();
    print(`Result: ${result.name}, ${result.type}`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
