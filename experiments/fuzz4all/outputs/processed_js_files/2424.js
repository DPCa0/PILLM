class Person {
  #firstName;
  #lastName;

  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  get fullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }
}

const getPersonAsync = (firstName, lastName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (firstName && lastName) {
        resolve(new Person(firstName, lastName));
      } else {
        reject('Invalid names provided');
      }
    }, 1000);
  });
};

(async () => {
  try {
    const person = await getPersonAsync('Jane', 'Doe');
    const { fullName } = person;
    print(`Hello, ${fullName}!`);
  } catch (error) {
    console.error(error);
  }
})();

const mergeObjects = (...objects) => {
  return objects.reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

const newObject = mergeObjects(
  { a: 1, b: 2 },
  { b: 3, c: 4 },
  { d: 5 }
);
print(newObject);

const arr = [1, 2, 3, 4];
const evenSquares = arr.filter(num => num % 2 === 0).map(num => num ** 2);
print(evenSquares);
