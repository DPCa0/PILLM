 
const generateMessage = ({ greeting = 'Hello', name = 'world' } = {}) => `${greeting}, ${name}!`;

 
const person = new Proxy(
  {
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    get: (target, property) => {
      print(`Accessed property: ${property}`);
      return target[property];
    },
  }
);

 
class Greeter {
  #message = '';

  constructor() {
    this.#message = generateMessage();
  }

  greet() {
    print(this.#message);
  }

  static changeGreeting(obj, greeting) {
    const newMessage = generateMessage({ greeting, name: obj.firstName });
    print(newMessage);
  }
}

 
const greeter = new Greeter();

 
const emphasize = (strings, ...values) => {
  return strings.reduce((acc, str, idx) => {
    return acc + str + (values[idx] ? values[idx].toUpperCase() : '');
  }, '');
};

print(emphasize`This is ${person.firstName} ${person.lastName}.`);

 
const fetchUser = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: 'Alice' }), 1000);
  });
};

(async () => {
  const user = await fetchUser(1);
  print(`Fetched user: ${user.name}`);
})();

 
Greeter.changeGreeting(person, 'Greetings');
greeter.greet();
