 
class Person {
  #name;
  
  constructor(name) {
    this.#name = name;
  }
  
  getName() {
    return this.#name;
  }

   
  static fromJSON(json) {
    const data = JSON.parse(json);
    return new Person(data.name);
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Property '${prop}' accessed`);
    return Reflect.get(...arguments);
  }
};

 
const person = new Proxy(new Person("Alice"), handler);

 
const settings = { theme: "dark", language: "en" };
const { theme, language, region = "US" } = settings;
const newSettings = { ...settings, language: "es" };

 
async function fetchData() {
  const response = await new Promise((resolve) => {
    setTimeout(() => resolve(JSON.stringify({ name: "Bob" })), 1000);
  });
  
  const newPerson = Person.fromJSON(response);
  print(`Fetched person name: ${newPerson.getName()}`);
}

 
fetchData();

 
print(person.getName());
print(`Current theme: ${theme}, language: ${language}, region: ${region}`);
print(`Updated settings:`, newSettings);
