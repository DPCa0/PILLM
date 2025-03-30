class Observable {
  constructor() {
    this.subscribers = [];
  }
  
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => this.subscribers = this.subscribers.filter(sub => sub !== callback);
  }
  
  notify(data) {
    this.subscribers.forEach(callback => callback(data));
  }
}

const asyncOperation = async (id) => {
  return new Promise(resolve => setTimeout(() => resolve(`Data for ID: ${id}`), 1000));
};

const main = async () => {
  const observer = new Observable();
  
  const unsubscribe = observer.subscribe(data => {
    print(`Received: ${data}`);
  });

  for await (const id of [1, 2, 3]) {
    const data = await asyncOperation(id);
    observer.notify(data);
  }
  
  unsubscribe();
  
  print('All operations complete.');
};

main();
