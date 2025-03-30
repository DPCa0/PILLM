 

class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  enqueue(promiseFunc) {
    this.queue.push(promiseFunc);
    this.processQueue();
  }

  async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;
    while (this.queue.length) {
      const promiseFunc = this.queue.shift();
      await promiseFunc();
    }
    this.isProcessing = false;
  }
}

async function fetchData(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetching error:", error);
  }
}

function transformData(data, transformFunc) {
  return data.map(transformFunc);
}

function logData(...args) {
  const [first, ...rest] = args;
  print("First argument:", first);
  print("Remaining arguments:", rest);
}

const queue = new AsyncQueue();

queue.enqueue(async () => {
  let data = await fetchData('https://api.example.com/data1');
  data = transformData(data, ({ id, value }) => ({ id, value: value * 2 }));
  logData(...data);
});

queue.enqueue(async () => {
  let data = await fetchData('https://api.example.com/data2');
  data = transformData(data, ({ name, age }) => ({ name: name.toUpperCase(), age: age + 1 }));
  logData(...data);
});
