const createAsyncIterable = (arr) => ({
  [Symbol.asyncIterator]: async function* () {
    for (const item of arr) {
      yield new Promise(resolve => setTimeout(() => resolve(item), 100));
    }
  }
});

const delayExecution = async (callback, delay) => {
  await new Promise(resolve => setTimeout(resolve, delay));
  callback();
};

const processData = async () => {
  const asyncIterable = createAsyncIterable([1, 2, 3, 4, 5]);

  for await (const number of asyncIterable) {
    delayExecution(() => {
      print(`Processed number: ${number}`);
    }, 200);
  }
};

processData().catch(console.error);

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

const debouncedLog = debounce((message) => {
  print(`Debounced Log: ${message}`);
}, 300);

['one', 'two', 'three'].forEach((msg, index) => {
  setTimeout(() => debouncedLog(msg), index * 100);
});
