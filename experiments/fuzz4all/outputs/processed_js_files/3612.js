 

 
const ID = Symbol('id');

class User {
  constructor(name) {
    this.name = name;
    this[ID] = User.generateId();
  }
  
  static generateId() {
    return Math.floor(Math.random() * 10000);
  }
  
  get info() {
    return { name: this.name, id: this[ID] };
  }
}

 
function* fetchData() {
  yield new Promise(resolve => setTimeout(() => resolve('Fetching User Data...'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Fetching Posts...'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Fetching Comments...'), 1000));
}

 
async function asyncOperation() {
  const fetchGenerator = fetchData();
  for (let promise of fetchGenerator) {
    print(await promise);
  }

   
  const userMap = new Map();
  const user1 = new User('Alice');
  const user2 = new User('Bob');

  userMap.set(user1[ID], user1);
  userMap.set(user2[ID], user2);

   
  const users = [...userMap.values()];
  print(...users.map(user => user.info));
}

 
(async () => {
  print('Starting asynchronous operations...');
  await asyncOperation();
  print('All operations completed.');
})();
