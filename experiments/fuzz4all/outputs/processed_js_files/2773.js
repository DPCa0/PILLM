class Observable {
  constructor() {
    this.observers = [];
  }
  
  subscribe(fn) {
    this.observers.push(fn);
  }
  
  unsubscribe(fn) {
    this.observers = this.observers.filter(subscriber => subscriber !== fn);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

const dataStream = new Observable();

const asyncGenerator = async function* (initialValue) {
  let value = initialValue;
  while (true) {
    yield new Promise(resolve => setTimeout(() => resolve(value++), 1000));
  }
};

async function processData() {
  const generator = asyncGenerator(1);
  for await (const num of generator) {
    dataStream.notify(num);
    if (num > 5) break;   
  }
}

const logData = (data) => {
  print(`Received: ${data}`);
};

const doubleAndLog = (data) => {
  print(`Doubled: ${data * 2}`);
};

dataStream.subscribe(logData);
dataStream.subscribe(doubleAndLog);

processData();
