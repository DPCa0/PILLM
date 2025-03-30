class Person {
  #name;  
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  get name() {
    return this.#name;
  }

  get age() {
    return this.#age;
  }
}

const asyncOperation = () => new Promise(resolve => setTimeout(() => resolve('Data Loaded'), 1000));

const fetchData = async () => {
  try {
    const result = await asyncOperation();
    print(result);
  } catch (error) {
    console.error('Error fetching data', error);
  }
};

const people = [
  new Person('Alice', 30),
  new Person('Bob', 25),
  new Person('Charlie', 35)
];

const ageGroups = people.reduce((acc, person) => {
  const { age } = person;
  const key = age < 30 ? 'Under 30' : '30 and Over';
  if (!acc[key]) acc[key] = [];
  acc[key].push(person.name);
  return acc;
}, {});

print('Age Groups:', ageGroups);

const sumAges = people
  .map(p => p.age)
  .reduce((total, age) => total + age, 0);

print('Total Age:', sumAges);

fetchData();
