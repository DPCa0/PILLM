class User {
  constructor(name) {
    this.name = name;
  }

   
  #balance = 100;

   
  #decrementBalance(amount) {
    this.#balance -= amount;
    return this.#balance;
  }

  purchaseItem(price) {
    if (price <= this.#balance) {
      print(`${this.name} bought an item for $${price}. Remaining balance: $${this.#decrementBalance(price)}`);
    } else {
      print(`${this.name} does not have enough balance to buy this item.`);
    }
  }

  get balance() {
    return this.#balance;
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function simulatePurchases(user) {
  const prices = [20, 50, 30, 10];

  for await (const price of prices) {
    user.purchaseItem(price);
    await delay(1000);  
  }
}

 
const userHandler = {
  get(target, prop, receiver) {
    print(`Getting ${prop} property`);
    return Reflect.get(...arguments);
  }
};

const alice = new User('Alice');
const proxyAlice = new Proxy(alice, userHandler);

simulatePurchases(proxyAlice);
