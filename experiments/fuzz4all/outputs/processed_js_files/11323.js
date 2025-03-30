 

class UserData {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get info() {
    return `${this.name}, age ${this.age}`;
  }
}

const fetchData = (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
        { name: 'Carol', age: 27 },
      ]);
    }, 1000);
  });
};

const processData = async () => {
  const url = 'https://api.example.com/data';
  const data = await fetchData(url);

  const uniqueAges = new Set();
  const userDataMap = new Map();

  data.forEach(({ name, age }) => {
    uniqueAges.add(age);
    userDataMap.set(name, new UserData(name, age));
  });

  const oldestUser = [...data].reduce((prev, current) => (prev.age > current.age ? prev : current), {});

  print(`Unique ages: ${[...uniqueAges].join(', ')}`);
  print(`Oldest User: ${oldestUser.name} (${oldestUser.age} years old)`);
  print(`User Info: ${userDataMap.get(oldestUser.name).info}`);
};

processData();
