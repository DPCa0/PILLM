 
class Person {
  #name;  
  constructor(name) {
    this.#name = name;
  }
  greet() {
    return `Hello, my name is ${this.#name}!`;
  }
}

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Getting ${property}`);
      return target[property];
    } else {
      console.warn(`Property ${property} not found!`);
      return undefined;
    }
  }
};

 
async function introduce(person) {
  return new Promise((resolve) => {
    setTimeout(() => {
      print(person.greet());
      resolve();
    }, 1000);
  });
}

 
const listNames = (...names) => {
  print(`Names: ${names.join(', ')}`);
};

const personProxy = new Proxy(new Person("Alice"), handler);

 
function tag(strings, ...values) {
  return strings[0] + values.map((v, i) => `${v}${strings[i + 1]}`).join('');
}

const adjective = "amazing";
const message = tag`This is an ${adjective} way to use tagged templates!`;
print(message);

 
(async function main() {
  await introduce(personProxy);
  listNames('Bob', 'Charlie', 'Dave');
})();
