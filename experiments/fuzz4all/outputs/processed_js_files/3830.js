 
class Person {
  #firstName;
  #lastName;

  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  get fullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }

  static createAnonymous() {
    return new Person("Anonymous", "User");
  }
}

 
async function fetchData(url) {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Fetched data from ${url}`);
    }, 1000);
  });
  print(data);
  return data;
}

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Getting value of ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value) => {
    print(`Setting value of ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const person = new Person('John', 'Doe');
const proxyPerson = new Proxy(person, handler);

print(proxyPerson.fullName);  
proxyPerson.firstName = 'Jane';     

 
const config = {
  api: {
    endpoint: null
  }
};
const endpoint = config.api?.endpoint ?? 'https://default.endpoint.com';
print(`API Endpoint: ${endpoint}`);

 
function tag(strings, ...values) {
  return strings.reduce((result, str, i) => `${result}${str}<${values[i] || ''}>`, '');
}
const tagMessage = tag`Hello, ${proxyPerson.fullName}. Welcome to ${endpoint}!`;
print(tagMessage);

 
(async function execute() {
  await fetchData('https://api.example.com');
})();
