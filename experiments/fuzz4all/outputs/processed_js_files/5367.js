class Animal {
  #name;  
  constructor(name) {
    this.#name = name;
  }
  speak() {
    print(`${this.#name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  speak() {
    super.speak();
    print(`${this.#getName()} barks.`);
  }
  #getName() {  
    return this.constructor.name;
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const data = await fetchData('https://api.github.com/users/octocat');
    print(data);

    const dog = new Dog('Rex', 'German Shepherd');
    dog.speak();
  } catch (error) {
    console.error('Error:', error);
  }
})();

const uniqueSet = new Set([1, 2, 2, 3, 4]);
print([...uniqueSet].map(num => num * 2).filter(num => num > 4));
