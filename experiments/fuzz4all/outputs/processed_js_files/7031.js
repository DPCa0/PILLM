 
class Person {
  #firstName;
  #lastName;

  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  get fullName() {
    return `${this.#capitalize(this.#firstName)} ${this.#capitalize(this.#lastName)}`;
  }

  #capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data;
}

 
const handler = {
  get: (obj, prop) => {
    print(`Getting ${prop}`);
    return prop in obj ? obj[prop] : 'Property does not exist';
  },
  set: (obj, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const target = { a: 1, b: 2 };
const proxy = new Proxy(target, handler);

 
(async function () {
   
  const person = new Person("john", "doe");
  print(person.fullName);

   
  try {
    const data = await fetchData('https://api.github.com');
    print(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

   
  print(proxy.a);
  proxy.c = 3;
  print(proxy.c);
})();
