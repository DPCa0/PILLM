 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

 
const targetObject = { greeting: "Hello", language: "JavaScript" };
const handler = {
  get: function(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new CustomError(`Property "${property}" not found`);
    }
  }
};
const proxyObject = new Proxy(targetObject, handler);

 
async function fetchGreeting() {
  try {
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => resolve(proxyObject.greeting), 1000);
    });
    print(response);
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(`Custom Error: ${error.message}`);
    } else {
      console.error(`General Error: ${error.message}`);
    }
  }
}

 
function* numberGenerator() {
  let number = 0;
  while (number < 3) {
    yield number++;
  }
}

 
const iterateNumbers = (generatorFunc) => {
  for (const num of generatorFunc()) {
    print(`Generated number: ${num}`);
  }
};

 
fetchGreeting();
iterateNumbers(numberGenerator);
