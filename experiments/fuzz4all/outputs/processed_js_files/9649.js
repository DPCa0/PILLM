class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

async function* fetchUsers(url) {
  let nextPage = url;
  while (nextPage) {
    const response = await fetch(nextPage);
    const data = await response.json();
    nextPage = data.nextPage;
    yield data.users;
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const emitter = new EventEmitter();

  emitter.on('data', (user) => {
    print(`User received: ${user.name}`);
  });

  emitter.on('complete', () => {
    print('All users processed.');
  });

  for await (const users of fetchUsers('https://api.example.com/users')) {
    for (const user of users) {
      emitter.emit('data', user);
      await delay(100);  
    }
  }

  emitter.emit('complete');
})();
