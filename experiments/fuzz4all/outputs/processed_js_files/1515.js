class User {
  #password;  
  constructor(username, password) {
    this.username = username;
    this.#password = password;
  }

   
  [Symbol.for('getPassword')]() {
    return this.#password;
  }
}

const getUserData = async (url) => {
  try {
    const response = await fetch(url);  
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching error:', error);
    throw error;
  }
};

 
const handler = {
  get: (target, prop) => {
    if (prop === 'age') return target[prop] + 1;  
    return Reflect.get(target, prop);
  },
  set: (target, prop, value) => {
    if (prop === 'age' && value < 0) {
      throw new Error('Age cannot be negative');
    }
    Reflect.set(target, prop, value);
  }
};

const user = new User('Alice', 'superSecret123');
const proxyUser = new Proxy(user, handler);

(async () => {
  const userData = await getUserData('https://jsonplaceholder.typicode.com/users/1');
  Object.assign(proxyUser, userData);
  
   
  print(proxyUser.name?.toUpperCase() ?? 'Name not found');
  print('Age:', proxyUser.age);
  
   
  print('Private Password:', user[Symbol.for('getPassword')]());
})();
