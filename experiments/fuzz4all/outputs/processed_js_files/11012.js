class User {
  #privateData = 'Secret';

  constructor(name) {
    this.name = name;
  }

  get privateInfo() {
    return `Sensitive info: ${this.#privateData}`;
  }
  
  async getData() {
    return fetch(`https: 
      .then(response => response.json())
      .then(data => data[0])
      .catch(error => console.error('Error fetching data:', error));
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async function* userGenerator() {
  const users = ['Leanne', 'Ervin', 'Clementine'];
  for (const user of users) {
    yield new User(user);
    await delay(1000);
  }
})().then(async (userIterator) => {
  for await (const user of userIterator) {
    print(`Fetching data for ${user.name}`);
    const data = await user.getData();
    print(data);
    print(user.privateInfo);
  }
});
