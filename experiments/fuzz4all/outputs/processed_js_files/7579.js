class AsyncRange {
  constructor(start, end, delay = 100) {
    this.current = start;
    this.end = end;
    this.delay = delay;
  }

  [Symbol.asyncIterator]() {
    return {
      current: this.current,
      end: this.end,
      delay: this.delay,
      next() {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (this.current <= this.end) {
              resolve({ value: this.current++, done: false });
            } else {
              resolve({ done: true });
            }
          }, this.delay);
        });
      },
    };
  }
}

const processData = async (data) => {
  const result = await Promise.all(
    data.map(async (num) => {
      const doubled = num * 2;
      await new Promise((resolve) => setTimeout(resolve, 50));
      print(`Processed: ${doubled}`);
      return doubled;
    })
  );

  return result;
};

const main = async () => {
  print("Starting async range:");
  const range = new AsyncRange(1, 5, 200);
  const collectedData = [];
  
  for await (const num of range) {
    print(`Collected: ${num}`);
    collectedData.push(num);
  }

  print("Processing data:");
  const processedData = await processData(collectedData);

  print("Processed Data:", processedData);
};

main().catch(console.error);
