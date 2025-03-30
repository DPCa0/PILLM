 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

 
const asyncOperation = (shouldSucceed) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve("Operation succeeded");
      } else {
        reject(new CustomError("Operation failed"));
      }
    }, 1000);
  });
};

 
const executeAsyncOperations = async () => {
  try {
     
    const [result1, result2] = await Promise.all([
      asyncOperation(true),
      asyncOperation(true),
    ]);

    print(`Results: ${result1}, ${result2}`);

     
    print(log`Async operation status: SUCCESS`);
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(log`Custom Error occurred: ${error.message}`);
    } else {
      console.error(log`Unknown Error: ${error.message}`);
    }
  }
};

 
function log(strings, ...values) {
  return strings.reduce((acc, str, idx) => acc + str + (values[idx] || ""), "");
}

 
(async () => {
  await executeAsyncOperations();
})();
