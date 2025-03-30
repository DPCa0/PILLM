class ComplexSystem {
  constructor() {
    this.state = new Proxy(
      { data: new Map(), listeners: [] },
      {
        set: (target, key, value) => {
          if (key === 'data') {
            target.data = value;
            target.listeners.forEach((callback) => callback(target.data));
          }
          return true;
        }
      }
    );
  }

  addData(key, value) {
    const prevData = new Map(this.state.data);
    prevData.set(key, value);
    this.state.data = prevData;
  }

  removeData(key) {
    const prevData = new Map(this.state.data);
    prevData.delete(key);
    this.state.data = prevData;
  }

  subscribe(callback) {
    this.state.listeners.push(callback);
  }
}

const system = new ComplexSystem();

system.subscribe((data) => {
  print("Data changed:", [...data.entries()].reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}));
});

system.addData('name', 'Alice');
system.addData('age', 30);
system.removeData('name');

 
async function* dataGenerator() {
  const items = ['Task1', 'Task2', 'Task3'];
  for (let item of items) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield item;
  }
}

(async function() {
  for await (const task of dataGenerator()) {
    print("Processing", task);
  }
})();
