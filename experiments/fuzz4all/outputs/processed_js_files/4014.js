const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = async () => {
  try {
    const [userData, postsData] = await Promise.all([
      fetchData('https://jsonplaceholder.typicode.com/users'),
      fetchData('https://jsonplaceholder.typicode.com/posts'),
    ]);

    const userPosts = new Map();

    for (const user of userData) {
      userPosts.set(user.id, []);
    }

    for (const post of postsData) {
      if (userPosts.has(post.userId)) {
        userPosts.get(post.userId).push(post);
      }
    }

    print('Users and their posts:', [...userPosts]);
  } catch (error) {
    console.error('Error:', error);
  }
};

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
      for (const listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }
}

const eventEmitter = new EventEmitter();

eventEmitter.on('dataFetched', () => {
  print('Data has been fetched and processed');
});

(async () => {
  await processData();
  eventEmitter.emit('dataFetched');
})();
