 
class Person {
  #name;  
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

   
  #calculateBirthYear = () => {
    return new Date().getFullYear() - this.#age;
  };

   
  introduce() {
    print(`Hello, my name is ${this.#name}. I was born in ${this.#calculateBirthYear()}.`);
  }

   
  static async fetchJoke() {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) throw new Error('Network response was not ok');
      const joke = await response.json();
      print(`Here's a joke: ${joke.setup} - ${joke.punchline}`);
    } catch (error) {
      console.error('Fetching joke failed: ', error);
    }
  }
}

// Using Proxy to intercept and log object property access
const handler = {
  get: function (target, prop, receiver) {
    print(`Property "${prop}" has been accessed.`);
    return Reflect.get(...arguments);
  },
};

const john = new Person('John', 30);
const proxiedJohn = new Proxy(john, handler);

proxiedJohn.introduce();

// Using template literals and tagged templates
function emphasize(strings, ...values) {
  return strings.reduce((acc, str, i) => `${acc}${str}**${values[i] || ''}**`, '');
}

print(emphasize`Wow, this is an ${'amazing'} feature of ${'JavaScript'}!`);

// Demonstrating usage of map, set and destructuring assignment
const map = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);

const set = new Set(['item1', 'item2', 'item3']);

// Destructuring assignment with rest parameter
const [first, ...rest] = set;
print(`First: ${first}, Rest: ${rest.join(', ')}`);

// Combining array methods with functional programming patterns
[...map.values()].filter(val => val.includes('1')).map(val => val.toUpperCase()).