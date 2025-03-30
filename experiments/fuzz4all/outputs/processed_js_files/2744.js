 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function complexOperation() {
  try {
    print("Starting complex operation...");

     
    const user = { id: 1, name: "Alice", age: 25 };
    const { name: userName, age: userAge } = user;

     
    print(`User: ${userName}, Age: ${userAge}`);

     
    const numbers = [1, 2, 3, 4, 5];
    const squaredEvens = numbers
      .map(n => n * n)
      .filter(n => n % 2 === 0);

    print(`Squared evens: ${squaredEvens}`);

     
    const moreNumbers = [6, 7, 8, ...numbers];
    print(`More numbers: ${moreNumbers}`);

     
    const uniqueNumbers = [...new Set(moreNumbers)];
    print(`Unique numbers: ${uniqueNumbers}`);

     
    await delay(1000);
    print("Operation resumed after delay");

     
    const sum = (...args) => args.reduce((acc, val) => acc + val, 0);
    print(`Sum: ${sum(1, 2, 3, 4, 5)}`);

     
    const person = { name: "Bob", age: 30 };
    const personProxy = new Proxy(person, {
      get(target, prop) {
        if (prop === 'age') {
          return target[prop] + 1;  
        }
        return target[prop];
      }
    });

    print(`Person via proxy: Name=${personProxy.name}, Age=${personProxy.age}`);

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

complexOperation();
