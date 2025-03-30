 
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    print(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  speak() {
    super.speak();
    print(`${this.name} barks.`);
  }
}

async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

const dog = new Dog('Rex');
dog.speak();

const generator = numberGenerator();
print(generator.next().value);  
print(generator.next().value);  

(async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  print(data);
})();

const complexArray = [1, [2, 3, [4, 5]], [6, 7]];
const flatArray = complexArray.flat(2);
print(flatArray);  

const uniqueNumbers = new Set([1, 2, 3, 3, 4, 4, 5]);
print(Array.from(uniqueNumbers));  
