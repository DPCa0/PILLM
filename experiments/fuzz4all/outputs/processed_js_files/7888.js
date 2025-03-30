 

 
function asyncOperation(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value < 50) {
        resolve(`Success: ${value}`);
      } else {
        reject(`Failure: ${value}`);
      }
    }, 1000);
  });
}

 
function* valueGenerator() {
  while (true) {
    yield Math.floor(Math.random() * 100);
  }
}

 
const handler = {
  apply(target, thisArg, argumentsList) {
    print(`Called asyncOperation with arguments: ${argumentsList}`);
    return target(...argumentsList);
  }
};

const proxiedAsyncOperation = new Proxy(asyncOperation, handler);

 
async function main() {
  const generator = valueGenerator();
  const maxAttempts = 5;
  let attempt = 0;
  let result;
  
  while (attempt < maxAttempts) {
    const { value } = generator.next();
    try {
      result = await proxiedAsyncOperation(value);
      print(result);
      break;
    } catch (error) {
      console.error(error);
    }
    attempt++;
  }

  if (attempt >= maxAttempts) {
    print("Reached maximum attempts without success.");
  }
}

 
main();
