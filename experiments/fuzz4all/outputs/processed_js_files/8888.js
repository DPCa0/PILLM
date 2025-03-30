class Animal {
  constructor(name) {
    this.name = name;
  }

  sound() {
    print(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  sound() {
    super.sound();
    print(`${this.name} barks.`);
  }
}

function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockData = {
        '/api/dog': { name: 'Buddy', breed: 'Golden Retriever' },
        '/api/cat': { name: 'Whiskers', breed: 'Siamese' },
      };
      mockData[url] ? resolve(mockData[url]) : reject('404 Not Found');
    }, 1000);
  });
}

(async () => {
  try {
    const dogData = await fetchData('/api/dog');
    const dog = new Dog(dogData.name, dogData.breed);
    dog.sound();

    const catData = await fetchData('/api/cat');
    const cat = new Animal(catData.name);
    cat.sound();

    const [first, second] = await Promise.all([
      fetchData('/api/dog'),
      fetchData('/api/cat'),
    ]);
    print(`Fetched: ${first.name} and ${second.name}`);
  } catch (error) {
    console.error(error);
  }
})();

const nums = [1, 2, 3, 4, 5];
const doubledEvens = nums.filter(num => num % 2 === 0).map(num => num * 2);
print(doubledEvens);

const uniqueID = Symbol('id');
const obj = { [uniqueID]: 12345, name: 'Unique Object' };
print(obj[uniqueID]);

const sum = (...numbers) => numbers.reduce((acc, val) => acc + val, 0);
print(sum(1, 2, 3, 4, 5));
