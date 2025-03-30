class User {
  #id;  
  static role = "guest";  

  constructor(name, age) {
    this.#id = Symbol(name);  
    this.name = name;
    this.age = age;
  }

   
  get userId() {
    return this.#id;
  }

   
  async *fetchData() {
    const urls = ['https://jsonplaceholder.typicode.com/posts', 'https://jsonplaceholder.typicode.com/users'];
    for (let url of urls) {
      const response = await fetch(url);
      yield await response.json();
    }
  }

   
  static changeRole(newRole) {
    User.role = newRole;
  }

   
  greet() {
    const greeting = this.name?.toUpperCase() ?? 'GUEST';
    print(`Hello, ${greeting}! Your role is ${User.role}.`);
  }
}

 
const userHandler = {
  set: (obj, prop, value) => {
    if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new Error('Age must be a non-negative number');
    }
    obj[prop] = value;
    return true;
  }
};

const user = new Proxy(new User('Alice', 25), userHandler);

(async () => {
  user.greet();
  User.changeRole('admin');
  user.greet();

   
  const dataIterator = user.fetchData();
  for await (const data of dataIterator) {
    print(data);
  }
})();

try {
  user.age = -5;  
} catch (error) {
  console.error(error.message);
}
