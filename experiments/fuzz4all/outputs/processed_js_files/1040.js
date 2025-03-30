 
class Greeter {
  constructor(name) {
    this.name = name;
  }

   
  greet() {
    print(customGreet`Hello, ${this.name}! Welcome to the future of JavaScript.`);
  }
}

 
function customGreet(strings, nameExp) {
  const timeOfDay = (new Date()).getHours() < 12 ? 'morning' : 'afternoon';
  return `${strings[0]}${nameExp}${strings[1]} Good ${timeOfDay}!`;
}

 
async function simulateAsyncOperation() {
  const result = await new Promise((resolve) =>
    setTimeout(() => resolve('Asynchronous task complete!'), 1000)
  );
  print(result);
}

 
const runApp = async () => {
  const greeter = new Greeter('Alice');
  const greetings = ['Hi', 'Hello', 'Hey'];
  
   
  greetings.forEach(greeting => print(`${greeting}, ${greeter.name}!`));
  
  greeter.greet();

   
  const { length: numGreetings } = greetings;
  print(`Number of greetings: ${numGreetings}`);
  
  await simulateAsyncOperation();
};

 
runApp();
