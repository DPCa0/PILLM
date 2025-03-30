class Observer {
  constructor() {
    this.listeners = new Map();
  }

  subscribe(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);
  }

  emit(eventType, data) {
    if (this.listeners.has(eventType)) {
      this.listeners.get(eventType).forEach(callback => callback(data));
    }
  }
}

const asyncProcess = (observer) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { message: "Process completed", timestamp: Date.now() };
      observer.emit('processComplete', data);
      resolve(data);
    }, 1000);
  });
}

(async () => {
  const observer = new Observer();
  
  observer.subscribe('processComplete', data => {
    print(`Observer 1: ${data.message} at ${new Date(data.timestamp).toLocaleTimeString()}`);
  });

  observer.subscribe('processComplete', data => {
    print(`Observer 2: Notification received with timestamp ${data.timestamp}`);
  });

  observer.subscribe('processComplete', data => {
    print('Observer 3: Additional processing...');
  });

  const data = await asyncProcess(observer);
  print('Process returned data:', data);
})();
