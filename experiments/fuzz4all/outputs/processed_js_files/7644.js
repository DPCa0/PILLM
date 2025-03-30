class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      for (let listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchUserData = async (userId) => {
  await delay(1000);   
  return { userId, name: `User${userId}` };
};

(async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('dataFetched', (data) => {
    print('Data received:', data);
  });

  const userIds = [1, 2, 3, 4, 5];
  for await (const id of userIds) {
    try {
      const data = await fetchUserData(id);
      eventEmitter.emit('dataFetched', data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
})();
