class User {
  #name;
  #messages = [];
  
  constructor(name) {
    this.#name = name;
    this.#subscribeToMessages();
  }
  
  #subscribeToMessages() {
    const receiveMessage = (msg) => this.#handleMessage(msg);
    MessageCenter.subscribe(receiveMessage);
  }

  #handleMessage(msg) {
    const { text, author } = msg;
    if (author !== this.#name) {
      print(`${author} to ${this.#name}: ${text}`);
    }
  }

  sendMessage(text) {
    MessageCenter.publish({ text, author: this.#name });
  }
}

const MessageCenter = (() => {
  const subscribers = new Set();
  
  return {
    subscribe(fn) {
      subscribers.add(fn);
    },
    publish(msg) {
      for (const subscriber of subscribers) {
        subscriber(msg);
      }
    }
  };
})();

(async () => {
  const user1 = new User('Alice');
  const user2 = new User('Bob');

  user1.sendMessage('Hi Bob!');
  await new Promise(r => setTimeout(r, 1000));  
  user2.sendMessage('Hi Alice! How are you?');

  await Promise.all([
    Promise.resolve().then(() => user1.sendMessage('I am good, thanks!'))
  ]);
})();
