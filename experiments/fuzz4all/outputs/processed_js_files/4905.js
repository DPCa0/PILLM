 

const fetchData = async (url) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: "Hello, world!" });
      } else {
        reject("Invalid URL");
      }
    }, 1000);
  });
};

function* createDataGenerator(data) {
   
  for (let char of data) {
    yield char;
  }
}

const createLoggingProxy = (target) => {
   
  return new Proxy(target, {
    get: (obj, prop) => {
      if (prop in obj) {
        print(`Accessing property "${prop}" with value "${obj[prop]}"`);
        return Reflect.get(obj, prop);
      } else {
        console.warn(`Property "${prop}" does not exist on target object.`);
      }
    },
  });
};

(async () => {
  try {
    const result = await fetchData("https://api.example.com/data");
    const loggingResult = createLoggingProxy(result);

    print("Logging property access:");
    const data = loggingResult.data;

    print("\nIterating using generator:");
    const generator = createDataGenerator(data);
    for (let char of generator) {
      print(char);
    }
  } catch (error) {
    console.error("Error:", error);
  }
})();
