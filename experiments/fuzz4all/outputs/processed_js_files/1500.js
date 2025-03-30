 
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const getUserInput = (query) => {
  return new Promise((resolve) => readline.question(query, resolve));
};

 
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, ${this.name}! You are ${this.age} years old.`;
  }
}

 
const userValidator = {
  set: function(obj, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    obj[prop] = value;
    return true;
  }
};

 
(async () => {
  try {
    const name = await getUserInput('Enter your name: ');
    const age = parseInt(await getUserInput('Enter your age: '), 10);

    let user = new User(name, age);
    user = new Proxy(user, userValidator);

     
    function* complexOperation() {
      yield `Processing data for ${user.name}...`;
      yield 'Operation in progress...';
      yield 'Finalizing...';
      return user.greet();
    }

    const operation = complexOperation();

    print(operation.next().value);
    print(operation.next().value);
    print(operation.next().value);
    print(operation.next().value);

  } catch (err) {
    console.error(`Error: ${err.message}`);
  } finally {
    readline.close();
  }
})();
