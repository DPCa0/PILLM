 

const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ userId: 1, username: 'john_doe', email: 'john@example.com' });
    }, 1000);
  });
};

class DataHandler {
  constructor(dataPromise) {
    this.dataPromise = dataPromise;
  }

  async init() {
    this.data = await this.dataPromise;
    return this.createProxy(this.data);
  }

  createProxy(data) {
    return new Proxy(data, {
      get: (target, prop, receiver) => {
        if (prop === 'displayName') {
          return `${target.username} <${target.email}>`;
        }
        return Reflect.get(target, prop, receiver);
      },
      set: (target, prop, value) => {
        if (prop === 'email' && !/.+@.+\..+/.test(value)) {
          throw new Error('Invalid email format');
        }
        return Reflect.set(target, prop, value);
      },
    });
  }
}

(async () => {
  const dataHandler = new DataHandler(fetchData());
  const userData = await dataHandler.init();

  print(userData.displayName);  

  try {
    userData.email = 'invalidEmail';  
  } catch (error) {
    console.error(error.message);  
  }

  userData.email = 'john.new@example.com';
  print(userData.displayName);  
})();
