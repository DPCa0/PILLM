class Person {
  #privateName;
  
  constructor(name) {
    this.#privateName = name;
  }

  static async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }

  *generateNumbers(limit) {
    let count = 0;
    while (count < limit) {
      yield count++;
    }
  }

  get name() {
    return this.#privateName;
  }

  set name(newName) {
    this.#privateName = newName;
  }
}

(async () => {
  try {
    const person = new Person('Alice');
    print(`Hello, ${person.name}!`);

    const numbers = person.generateNumbers(5);
    for (let number of numbers) {
      print(number);
    }

    const data = await Person.fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print('Fetched Data:', data);
    
  } catch (error) {
    console.error('Error:', error);
  }
})();
