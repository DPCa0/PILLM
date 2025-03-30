class Person {
  #name;  
  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (typeof value !== 'string' || value.length < 1) {
      throw new Error('Invalid name');
    }
    this.#name = value;
  }

  async greet() {
     
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`Hello, my name is ${this.#name}`);
      }, 1000);
    });
  }
}

const logPersonGreeting = async (name) => {
  const p = new Person(name);
  try {
    const message = await p.greet();
    print(message);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const names = ['Alice', 'Bob', 'Charlie'];
const greetPromises = names.map(name => logPersonGreeting(name));

 
Promise.all(greetPromises)
  .then(() => {
    print('All greetings have been made.');
  })
  .catch(error => {
    console.error('Error in processing greetings:', error);
  });

 
const user = {
  profile: {
    email: 'example@example.com'
  }
};

const email = user?.profile?.email ?? 'No email available';
print(`User email: ${email}`);
