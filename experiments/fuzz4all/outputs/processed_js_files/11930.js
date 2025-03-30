 
const { EventEmitter } = require('events');

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop === 'secret') return `The secret is safe: ${target[prop]}`;
    return Reflect.get(...arguments);
  },
  set: (target, prop, value) => {
    if (prop === 'password') {
      throw new Error('Password is immutable');
    }
    target[prop] = value;
    return true;
  },
};

 
class User extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
    this._data = new Proxy({ secret: '1234', password: 'abcd' }, handler);
  }

  async login(password) {
    try {
      const isValid = await this.verifyPassword(password);
      this.emit('login', isValid);
    } catch (error) {
      console.error(error.message);
    }
  }

   
  async verifyPassword(inputPassword) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(inputPassword === this._data.secret);
      }, 1000);
    });
  }

   
  *getRoles() {
    yield 'admin';
    yield 'user';
    yield 'guest';
  }
}

 
const user = new User('Alice');

 
user.on('login', (isValid) => {
  print(isValid ? 'Login successful' : 'Invalid password');
});

 
user.login('1234');

 
for (let role of user.getRoles()) {
  print(`Role: ${role}`);
}

 
print(user._data.secret);  
try {
  user._data.password = 'newpass';
} catch (error) {
  console.error(error.message);  
}
