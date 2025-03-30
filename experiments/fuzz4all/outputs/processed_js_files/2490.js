class NetworkManager {
  #listeners = new Map();

  constructor() {
    this.#initializeListeners();
  }

  #initializeListeners() {
    ['connect', 'disconnect', 'error'].forEach(event => {
      this.#listeners.set(event, []);
    });
  }

  on(event, callback) {
    const callbacks = this.#listeners.get(event);
    if (callbacks) {
      callbacks.push(callback);
    } else {
      console.warn(`No event named ${event} exists.`);
    }
  }

  #trigger(event, data) {
    const callbacks = this.#listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  async simulateNetworkActivity() {
    try {
      await this.#connect();
      await this.#processData();
      await this.#disconnect();
    } catch (error) {
      this.#trigger('error', error);
    }
  }

  #connect() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.#trigger('connect', { message: 'Connected to the network' });
        resolve();
      }, 1000);
    });
  }

  #processData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        print('Processing data...');
        resolve();
      }, 2000);
    });
  }

  #disconnect() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.#trigger('disconnect', { message: 'Disconnected from the network' });
        resolve();
      }, 1000);
    });
  }
}

 
const netManager = new NetworkManager();
netManager.on('connect', data => print(data.message));
netManager.on('disconnect', data => print(data.message));
netManager.on('error', error => console.error('Error:', error.message));

netManager.simulateNetworkActivity();
