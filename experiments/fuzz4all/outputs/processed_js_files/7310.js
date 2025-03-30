 
class User {
  #name;
  #email;

  constructor(name, email) {
    this.#name = name;
    this.#email = email;
  }

   
  static #validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

   
  updateEmail(newEmail) {
    if (User.#validateEmail(newEmail)) {
      this.#email = newEmail;
      print(`Email updated to: ${newEmail}`);
    } else {
      print(`Invalid email format: ${newEmail}`);
    }
  }

   
  async getUserInfo() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ name: this.#name, email: this.#email });
      }, 1000);  
    });
  }

   
  *emailGenerator() {
    while (true) {
      yield this.#email;
    }
  }
}

 
const userProxyHandler = {
  get(target, prop, receiver) {
    print(`Getting property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
const user = new Proxy(new User('Alice', 'alice@example.com'), userProxyHandler);

 
(async () => {
  user.updateEmail('alice@newdomain.com');
  user.updateEmail('invalid-email');

  const info = await user.getUserInfo();
  print(info);

  const emailIterator = user.emailGenerator();
  print(emailIterator.next().value);  
  print(emailIterator.next().value);  
})();
