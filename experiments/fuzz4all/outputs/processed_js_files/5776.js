class Observable {
  constructor() {
    this.subscribers = [];
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  unsubscribe(fn) {
    this.subscribers = this.subscribers.filter(subscriber => subscriber !== fn);
  }

  notify(data) {
    this.subscribers.forEach(subscriber => subscriber(data));
  }
}

function asyncOperation(result) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(result);
      } else {
        reject('Operation failed');
      }
    }, 1000);
  });
}

(async function complexExample() {
  const obs = new Observable();
  
  const subscriber = async data => {
    try {
      const result = await asyncOperation(data);
      print('Subscriber received:', result);
    } catch (error) {
      print('Subscriber error:', error);
    }
  };
  
  obs.subscribe(subscriber);
  
  for (let i = 0; i < 5; i++) {
    obs.notify(`Data packet #${i}`);
  }
  
  obs.unsubscribe(subscriber);
})();
