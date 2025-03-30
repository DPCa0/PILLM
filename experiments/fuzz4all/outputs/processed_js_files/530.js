 
function createPerson(name, age) {
  let idGenerator = (function* () {
    let id = 0;
    while (true) yield ++id;
  })();

  const person = {
    id: idGenerator.next().value,
    name,
    age,
  };

  return new Proxy(person, {
    get(target, prop) {
      if (prop in target) {
        print(`Getting ${prop}: ${target[prop]}`);
        return target[prop];
      } else {
        throw new Error(`Property ${prop} does not exist`);
      }
    },
    set(target, prop, value) {
      if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
        throw new Error('Invalid age');
      }
      target[prop] = value;
      print(`Set ${prop} to ${value}`);
      return true;
    },
    ownKeys(target) {
      print('Accessing all properties');
      return Object.keys(target);
    }
  });
}

 
async function main() {
  const people = [
    createPerson('Alice', 30),
    createPerson('Bob', 25),
    createPerson('Charlie', 35),
  ];

  console.log(await Promise.all(
    people.map(async (person) => {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
      print(`Hello, ${person.name}!`);
      person.age += 1;  
      return `${person.name}'s new age is ${person.age}`;
    })
  ));
}

main().catch(console.error);
