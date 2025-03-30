class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  const data = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 }
  ];

  const sortedData = data.sort((a, b) => a.age - b.age);
  const persons = sortedData.map(({ name, age }) => new Person(name, age));

  for await (const person of persons) {
    print(person.greet());
    await delay(1000);
  }

  const names = persons.flatMap(person => person.name.split(''));
  print(`Concatenated Names: ${names.join('')}`);
}

main().catch(console.error);
