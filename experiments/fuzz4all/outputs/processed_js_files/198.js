 
class Advanced {
  #privateField = 'This is a private field';
  
  constructor(name) {
    this.name = name;
  }
  
  get #privateMethod() {
    return `Hello, ${this.name}! ${this.#privateField}`;
  }
  
  static async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return null;
    }
  }
  
  publicMethod() {
    print(this.#privateMethod);
  }
}

 
function* numberGenerator() {
  let number = 1;
  while (true) {
    yield number++;
  }
}

 
const user = { id: 1, username: 'jsCoder', email: 'coder@example.com' };
const { username, ...rest } = user;

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const data = await Advanced.fetchData(url);
  print('Fetched data:', data);
})();

 
const gen = numberGenerator();
const instance = new Advanced(username);

print(`Rest of user info:`, rest);
print(`Generated number:`, gen.next().value);
instance.publicMethod();
