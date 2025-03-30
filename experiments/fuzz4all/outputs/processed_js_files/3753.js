 
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
  }
}

const peopleData = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
];

 
const people = peopleData.map(({ name, age }) => new Person(name, age));

people.forEach(person => {
  print(person.introduce());
});

 
const fetchData = (shouldFail = false) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (shouldFail) {
      reject('Error: Data fetch failed!');
    } else {
      resolve({ data: 'Here is your data!', status: 200 });
    }
  }, 1000);
});

const displayData = async () => {
  try {
    const { data } = await fetchData();
    print(`Fetched data: ${data}`);
  } catch (error) {
    console.error(error);
  }
};

displayData();

 
const personHandler = {
  set(target, property, value) {
    if (property === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new TypeError('Age must be a non-negative number');
    }
    target[property] = value;
    return true;
  }
};

const proxiedPerson = new Proxy(new Person('Dave', 40), personHandler);
try {
  proxiedPerson.age = -5;  
} catch (e) {
  console.error(e.message);
}

print(proxiedPerson.introduce());
