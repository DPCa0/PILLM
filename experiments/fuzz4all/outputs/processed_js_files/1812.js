class Person {
  #name;
  #age;
  
  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  get info() {
    return `${this.#name}, Age: ${this.#age}`;
  }

  static async *fetchPeopleData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const people = await response.json();
    for (const person of people) {
      yield new Person(person.name, Math.floor(Math.random() * 50) + 20);
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const peopleGen = Person.fetchPeopleData();
  for await (const person of peopleGen) {
    print(person.info);
    await delay(1000);
  }
})();

 
const target = {
  message1: "hello",
  message2: "everyone"
};

const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      return Reflect.get(obj, prop).toUpperCase();
    }
    return `Property ${prop} not found`;
  }
};

const proxy = new Proxy(target, handler);
print(proxy.message1);   
print(proxy.message2);   
print(proxy.message3);   

 
const settings = {
  volume: 50,
  brightness: 70,
  contrast: 60,
};

const { volume, ...otherSettings } = settings;
const newSettings = { ...otherSettings, contrast: 75 };

print(volume);  
print(newSettings);  
