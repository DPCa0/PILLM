 
async function fetchData() {
  const simulateFetch = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: 'Hello, Complex World!' }), 1000)
    );

  try {
    const response = await simulateFetch();
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    }
    return `Property "${property}" not found`;
  },
};

 
class Greeter {
  constructor(name) {
    this.name = name;
  }

   
  static welcomeMessage() {
    return 'Welcome to the world of JS!';
  }

   
  get greeting() {
    return `Hello, ${this.name}!`;
  }

   
  [Symbol.iterator]() {
    let step = 0;
    const iterator = {
      next: () => {
        step++;
        if (step === 1) {
          return { value: `Step ${step}: Start`, done: false };
        } else if (step === 2) {
          return { value: `Step ${step}: Continue`, done: false };
        }
        return { value: `Step ${step}: End`, done: true };
      },
    };
    return iterator;
  }
}

(async () => {
   
  const { name, ...rest } = { name: 'Alice', age: 30, job: 'Engineer' };
  const newPerson = { ...rest, profession: 'Developer' };

   
  print(Greeter.welcomeMessage());

  const proxyPerson = new Proxy(newPerson, handler);
  print(proxyPerson.age);  
  print(proxyPerson.occupation);  

  const greeter = new Greeter(name);
  print(greeter.greeting);  

  for (const step of greeter) {
    print(step);
  }

   
  try {
    const message = await fetchData();
    print(message);
  } catch (