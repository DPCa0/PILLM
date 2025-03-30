 
async function* fetchUserData(userIds) {
  for (const id of userIds) {
     
    yield new Promise((resolve) =>
      setTimeout(() => resolve(`Fetched data for user ${id}`), 1000)
    );
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Getting property ${prop}`);
    return prop in target ? target[prop] : `Property ${prop} not found`;
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const user = new Proxy({}, handler);

 
class SecretBox {
  #secret = 'Super Secret';

  #revealSecret() {
    print(`Revealed: ${this.#secret}`);
  }

  showSecret() {
    this.#revealSecret();
  }
}

 
(async () => {
  const userIds = [1, 2, 3];
  const userData = fetchUserData(userIds);

  for await (const data of userData) {
    print(data);
  }

   
  user.name = 'John Doe';
  print(user.name);
  print(user.age);

   
  const box = new SecretBox();
  box.showSecret();
})();
