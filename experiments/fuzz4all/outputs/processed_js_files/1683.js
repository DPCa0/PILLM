class Observer {
  constructor() {
    this.subscribers = new Set();
  }
  subscribe(callback) {
    this.subscribers.add(callback);
  }
  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }
  notify(data) {
    this.subscribers.forEach(callback => callback(data));
  }
}

class DataStream {
  constructor() {
    this.data = [];
    this.observer = new Observer();
  }
  addData(newData) {
    this.data.push(newData);
    this.observer.notify(this.data);
  }
  [Symbol.iterator]() {
    let index = 0;
    let data = this.data;
    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
}

const dataStream = new DataStream();
dataStream.observer.subscribe((data) => print("New data received:", data));
dataStream.addData(10);
dataStream.addData(20);

(async function processData() {
  for await (let item of dataStream) {
    print("Processing item:", item);
  }
})();
