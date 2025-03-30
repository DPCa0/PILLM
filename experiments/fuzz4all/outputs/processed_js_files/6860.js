const asyncIterable = {
  [Symbol.asyncIterator]() {
    let i = 0;
    return {
      next() {
        if (i < 5) {
          return Promise.resolve({ value: i++, done: false });
        }
        return Promise.resolve({ done: true });
      }
    };
  }
};

async function* generator() {
  yield* asyncIterable;
}

const processValues = async () => {
  try {
    for await (const num of generator()) {
      const result = await new Promise((resolve, reject) => {
        setTimeout(() => resolve(num * 2), Math.random() * 1000);
      });
      print(`Processed value: ${result}`);
    }
  } catch (error) {
    console.error('Error processing values:', error);
  } finally {
    print('Processing complete.');
  }
};

(async () => {
  await processValues();
})();
