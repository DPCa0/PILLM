class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
   
  get isAdult() {
    return this.age >= 18;
  }

   
  static greetUsers(users) {
    users.forEach(user => print(`Hello, ${user.name}!`));
  }
}

 
async function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => resolve({ data: [new User('Alice', 25), new User('Bob', 17)] }), 1000);
  });
}

 
(async function() {
  const { data: users } = await fetchData();
  User.greetUsers(users);

   
  const [adult, ...others] = users.filter(user => user.isAdult);

  print(`The first adult is: ${adult.name}`);
  print(`Other users: ${others.map(user => user.name).join(', ')}`);
})();
