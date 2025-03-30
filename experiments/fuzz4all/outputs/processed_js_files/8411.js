class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  #validateAge() {
    if (this.age < 0) throw new Error("Age cannot be negative");
  }
  getDetails() {
    this.#validateAge();
    return `${this.name} is ${this.age} years old`;
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchPersonData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

(async () => {
  try {
    await delay(1000);
    const data = await fetchPersonData("https://api.example.com/person");
    const person = new Person(data.name, data.age);
    print(person.getDetails());
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
