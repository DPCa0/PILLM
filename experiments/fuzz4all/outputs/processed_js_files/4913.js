class AsyncSequence {
  constructor(...asyncFunctions) {
    this.asyncFunctions = asyncFunctions;
  }

  async execute(initialValue) {
    return this.asyncFunctions.reduce(
      (prevPromise, currentFunction) =>
        prevPromise.then(currentFunction),
      Promise.resolve(initialValue)
    );
  }
}

function delay(milliseconds, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), milliseconds));
}

const complexAsyncTask = new AsyncSequence(
  async (data) => {
    print('Step 1:', data);
    return delay(1000, data * 2);
  },
  async (data) => {
    print('Step 2:', data);
    const newData = await delay(1000, data + 5);
    return newData;
  },
  async (data) => {
    print('Step 3:', data);
    return delay(1000, data - 3);
  }
);

(async function runComplexTask() {
  try {
    const result = await complexAsyncTask.execute(10);
    print('Final Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
})();
