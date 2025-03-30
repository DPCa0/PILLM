class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  #secret = "defaultSecret";  

  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }

   
  static compareAge(user1, user2) {
    return user1.age - user2.age;
  }

   
  #revealSecret() {
    return `Secret: ${this.#secret}`;
  }

  reveal() {
    print(this.#revealSecret());
  }

   
  get secret() {
    return this.#secret;
  }

  set secret(newSecret) {
    if (typeof newSecret === 'string') {
      this.#secret = newSecret;
    }
  }

   
  *createIterator() {
    yield this.name;
    yield this.age;
    yield this.#secret;
  }

   
  static proxyUser(user) {
    return new Proxy(user, {
      get(target, prop) {
        if (prop === 'age') {
          return `Accessed: ${target[prop]}`;
        }
        return Reflect.get(target, prop);
      },
    });
  }
}

 
let alice = new User('Alice', 30);
let bob = new User('Bob', 25);

 
print(`Age Difference: ${User.compareAge(alice, bob)}`);

 
let proxyBob = User.proxyUser(bob);
print(proxyBob.age);  

 
alice.reveal();

 
alice.secret = 'newSecret';
print(alice.secret);

 
const iterator = alice.createIterator();
for (const value of iterator) {
  print(value);
}
