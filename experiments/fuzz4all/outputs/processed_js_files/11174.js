class Person {
  constructor(name) {
    this.name = name;
  }

  async greet() {
    return `Hello, my name is ${this.name}`;
  }
}

const capitalizeNames = names => names.map(name => name.charAt(0).toUpperCase() + name.slice(1));

const personFactory = async (...names) => {
  const capitalizedNames = capitalizeNames(names);
  const persons = capitalizedNames.map(name => new Person(name));

  for await (const person of persons) {
    print(await person.greet());
  }
};

const delayExecution = (callback, delay) => new Promise(resolve => {
  setTimeout(() => {
    resolve(callback());
  }, delay);
});

(async function() {
  const delayedFunction = () => print("This message is delayed");
  await delayExecution(delayedFunction, 1000);

  const names = ['alice', 'bob', 'charlie'];
  await personFactory(...names);
})();
