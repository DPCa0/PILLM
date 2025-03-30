 
const complexFunction = async () => {
   
  const fetchData = url => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject('URL not provided');
      }
    }, 1000);
  });

  try {
    const data = await fetchData('https://api.example.com');
    print(data);

     
    const [protocol, , domain] = 'https://api.example.com'.split('/');
    print(`Protocol: ${protocol}, Domain: ${domain}`);

     
    const numbers = [1, 2, 3, 4, 5];
    const squaredNumbers = numbers.map(num => num ** 2);
    print('Squared Numbers:', squaredNumbers);

     
    const uniqueNumbers = new Set([1, 2, 2, 3, 4, 4, 5]);
    print('Unique Numbers:', Array.from(uniqueNumbers));

     
    const moreNumbers = [6, 7, 8];
    const allNumbers = [...numbers, ...moreNumbers];
    print('All Numbers:', allNumbers);

    const person = { name: 'Alice', age: 30 };
    const updatedPerson = { ...person, age: 31 };
    print('Updated Person:', updatedPerson);

     
    class Animal {
      constructor(name) {
        this.name = name;
      }
      speak() {
        print(`${this.name} makes a noise.`);
      }
    }
  
    class Dog extends Animal {
      speak() {
        print(`${this.name} barks.`);
      }
    }
  
    const dog = new Dog('Rex');
    dog.speak();

  } catch (error) {
    console.error('Error:', error);
  }
};

 
complexFunction();
