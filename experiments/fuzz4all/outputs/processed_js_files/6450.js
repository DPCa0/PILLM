class AsyncIterator {
  constructor(data) {
    this.data = data;
  }

  [Symbol.asyncIterator]() {
    let i = 0;
    const data = this.data;
    return {
      async next() {
        if (i < data.length) {
           
          await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
          return { value: data[i++], done: false };
        }
        return { done: true };
      }
    };
  }
}

const fetchData = async () => {
  return new Promise(resolve => setTimeout(() => resolve(['apple', 'banana', 'cherry']), 1000));
};

(async () => {
  try {
    const data = await fetchData();
    const asyncIterable = new AsyncIterator(data);

    for await (const item of asyncIterable) {
      print(`Processing ${item}`);
    }

    const result = data.reduce((acc, fruit) => ({ ...acc, [fruit]: fruit.length }), {});
    print('Result:', result);
    
  } catch (error) {
    console.error('Error:', error);
  }
})();
