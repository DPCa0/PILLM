class User {
  #password;
  constructor(name, age, password) {
    this.name = name;
    this.age = age;
    this.#password = this.#encryptPassword(password);
  }

  #encryptPassword(password) {
    return [...password].map(char => char.charCodeAt(0) + 5).join('');
  }

  authenticate(inputPassword) {
    return this.#password === this.#encryptPassword(inputPassword);
  }

  *infoGenerator() {
    yield `Name: ${this.name}`;
    yield `Age: ${this.age}`;
    yield `Password: ${'*'.repeat(this.#password.length)}`;
  }

  static withDefaultPassword(name, age) {
    return new User(name, age, "default");
  }
}

 
const handler = {
  get(target, prop, receiver) {
    const origMethod = target[prop];
    return function (...args) {
      print(`Called method: ${prop}(${args.join(', ')})`);
      return origMethod.apply(this, args);
    };
  }
};

 
const user = new Proxy(new User('Alice', 30, 'mySecret'), handler);
print(user.authenticate('mySecret'));   
print(user.authenticate('wrongPass'));  

const userInfo = user.infoGenerator();
for (let info of userInfo) {
  print(info);
}

const defaultUser = User.withDefaultPassword('Bob', 25);
print(defaultUser.authenticate('default'));   
