 

 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: "Sample Data" });
      } else {
        reject("Invalid URL");
      }
    }, 1000);
  });
}

 
function* dataGenerator(url) {
  try {
    const data = yield fetchData(url);
    print("Data Received:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

 
async function runGenerator(genFunc) {
  const iterator = genFunc();
  const next = async (iteration) => {
    if (!iteration.done) {
      const result = await iteration.value;
      next(iterator.next(result));
    }
  };
  next(iterator.next());
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Property '${prop}' accessed.`);
      return Reflect.get(target, prop, receiver);
    }
    throw new Error(`Property '${prop}' does not exist.`);
  },
  set(target, prop, value) {
    print(`Setting value of '${prop}' to '${value}'.`);
    target[prop] = value;
    return true;
  }
};

 
const monitoredObject = new Proxy({ name: "AdvancedJS", level: "High" }, handler);

 
print(monitoredObject.name);   
monitoredObject.level = "Expert";    

 
runGenerator(() => dataGenerator("https://api.example.com/data"));
