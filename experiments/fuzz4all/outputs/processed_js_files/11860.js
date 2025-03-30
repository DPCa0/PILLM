const users = [
  { id: 1, name: 'Alice', age: 28, role: 'admin' },
  { id: 2, name: 'Bob', age: 35, role: 'editor' },
  { id: 3, name: 'Charlie', age: 22, role: 'user' },
  { id: 4, name: 'David', age: 30, role: 'admin' },
  { id: 5, name: 'Eve', age: 26, role: 'user' }
];

 
const [firstAdmin, secondAdmin, ...otherUsers] = users.filter(({role}) => role === 'admin');

 
const checkUserAge = ageLimit => 
  new Promise((resolve, reject) => {
    const result = users.every(user => user.age > ageLimit);
    setTimeout(() => result ? resolve('All users meet age criteria') : reject('Some users do not meet age criteria'), 1000);
  });

 
(async () => {
  try {
    const message = await checkUserAge(20);
    print(message);
  } catch (error) {
    console.error(error);
  }
})();

 
function* userGenerator(userList) {
  for (let user of userList) {
    yield `Name: ${user.name}, Age: ${user.age}, Role: ${user.role}`;
  }
}

 
const userIterator = userGenerator(users);

 
for (let userInfo of userIterator) {
  print(userInfo);
}
