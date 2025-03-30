 
const CanDrive = (superclass) => class extends superclass {
  drive() {
    print(`${this.name} is driving!`);
  }
};

 
const _balance = Symbol('balance');

class Account {
  constructor(balance = 0) {
    this[_balance] = balance;
  }

  get balance() {
    return this[_balance];
  }

  deposit(amount) {
    this[_balance] += amount;
    print(`Deposited: $${amount}`);
  }
}

class Person extends CanDrive(Account) {
  constructor(name, balance) {
    super(balance);
    this.name = name;
  }

  greet() {
    print(`Hello, my name is ${this.name}.`);
  }

   
  async work(hours) {
    print(`${this.name} is working...`);
    await new Promise(resolve => setTimeout(resolve, 1000 * hours));
    const earnings = hours * 20;
    print(`${this.name} earned $${earnings}`);
    this.deposit(earnings);
  }
}

class Company {
  constructor(name) {
    this.name = name;
    this.employees = [];
  }

  hire(person) {
    this.employees.push(person);
    print(`${person.name} was hired at ${this.name}.`);
  }
}

 
const accountant = new Proxy(new Person('Alice', 100), {
  get(target, prop) {
    if (prop === 'balance') {
      print(`Checking ${target.name}'s balance...`);
    }
    return target[prop];
  }
});

// Example of Reflect API for more meta-programming
Reflect.set(accountant, 'name', 'Alice The Great');

(async () => {
  const company = new Company('TechStars');
  company.hire(accountant);

  accountant.greet();
  accountant.drive();
  await accountant.work(3);
  print(`Final balance for ${accountant.name}: $${accountant.balance}`);
})();
