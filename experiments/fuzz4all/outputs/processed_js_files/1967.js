 
import fs from 'fs/promises';

 
(async () => {
   
  const getConfig = (config) => config?.settings?.theme ?? 'default';

   
  const _privateData = Symbol('privateData');
  
  class User {
    constructor(name, data) {
      this.name = name;
      this[_privateData] = data;
    }
    
     
    get [Symbol.for('data')]() {
      return this[_privateData];
    }
    
     
    static greet(user) {
      return `Hello, ${user.name}!`;
    }
  }

   
  const userMap = new Map();
  const activeUsers = new Set();

   
  const data = await fs.readFile('./data.json', 'utf-8');
  const jsonData = JSON.parse(data);

  jsonData.users.forEach((userData) => {
    const user = new User(userData.name, userData.data);
    userMap.set(userData.id, user);

     
    activeUsers.add(Promise.resolve(user));
  });

   
  const results = await Promise.allSettled([...activeUsers]);

  results.forEach(result => {
    if (result.status === 'fulfilled') {
      print(User.greet(result.value));  
      print(`Config: ${getConfig(result.value[Symbol.for('data')])}`);  
    }
  });
})();
