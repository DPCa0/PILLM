 
class NetworkRequest {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return this.processData(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  processData({ results }) {
    return results.map(({ name, email }) => `${name.first} ${name.last} - ${email}`).join('\n');
  }
}

const randomUserRequest = new NetworkRequest('https://randomuser.me/api/?results=5');

randomUserRequest.fetchData().then(console.log);

 
const handler = {
  get: (target, prop) => {
    print(`Property ${prop} has been accessed`);
    return prop in target ? target[prop] : `Property ${prop} is not available`;
  },
  set: (target, prop, value) => {
    print(`Setting value ${value} to property ${prop}`);
    target[prop] = value;
    return true;
  }
};

const user = new Proxy({}, handler);
user.name = 'John Doe';
print(user.name);
print(user.age);
