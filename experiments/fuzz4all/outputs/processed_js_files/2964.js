class User {
  #name;
  constructor(name, age) {
    this.#name = name;
    this.age = age;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (value.length < 4) throw new Error("Name too short.");
    this.#name = value;
  }
}

const users = new Proxy([], {
  get(target, prop) {
    if (prop === 'adults') {
      return target.filter(user => user.age >= 18);
    }
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    if (value instanceof User) {
      print(`Adding user: ${value.name}`);
      target[prop] = value;
      return true;
    }
    throw new TypeError('Value must be an instance of User.');
  }
});

const calculateAverageAge = (...ages) => {
  const sum = ages.reduce((a, b) => a + b, 0);
  return sum / ages.length;
};

const main = async () => {
  const data = await Promise.resolve([{ name: 'Alice', age: 30 }, { name: 'Bob', age: 15 }]);
  
  data.forEach(item => {
    try {
      users.push(new User(item.name, item.age));
    } catch (error) {
      console.error(error.message);
    }
  });

  const adultNames = users.adults.map(user => user.name);
  print(`Adult Users: ${adultNames.join(', ')}`);
  
  const averageAge = calculateAverageAge(...users.map(user => user.age));
  print(`Average Age: ${averageAge.toFixed(2)}`);
};

main();
