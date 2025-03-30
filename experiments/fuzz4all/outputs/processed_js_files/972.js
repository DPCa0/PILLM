 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

 
async function* asyncNumberGenerator() {
  let number = 0;
  while (number < 5) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield number++;
  }
}

 
const createTrackedObject = (obj) => {
  return new Proxy(obj, {
    get(target, property, receiver) {
      print(`Property '${property}' accessed.`);
      return Reflect.get(target, property, receiver);
    }
  });
};

 
async function processNumbers() {
  try {
    const trackedObj = createTrackedObject({ name: "Tracked Object", version: 1.0 });
    print(trackedObj.name);

    const generator = asyncNumberGenerator();
    const promises = [];
    
    for await (const number of generator) {
      promises.push(Promise.resolve(`Processed number: ${number}`));
    }
    
    const results = await Promise.allSettled(promises);
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        print(result.value);
      }
    });
  } catch (error) {
    if (error instanceof CustomError) {
      console.error("Custom error occurred:", error.message);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
  }
}

 
processNumbers();
