 
import fs from 'fs/promises';

 
(async () => {
   
  const { user = 'defaultUser', age = 25 } = { user: 'Alice', age: 30 };
  
   
  const greeting = (strings, userName, userAge) => {
    return `${strings[0]}${userName}${strings[1]}${userAge}${strings[2]}`;
  };
  print(greeting`Hello, ${user}! You are ${age} years old.`);

   
  const urls = ['file1.txt', 'file2.txt'];
  const promises = urls.map(url => fs.readFile(url, 'utf-8').catch(() => null));

  const results = await Promise.allSettled(promises);
  results.forEach((result, index) => {
    console.log(
      `File ${index + 1}: ${result.status === 'fulfilled' ? result.value : 'Failed to load'}`
    );
  });

   
  const map = new Map();
  map.set('name', 'Bob');
  map.set('job', 'Developer');
  
  function* iterateMap(map) {
    for (const [key, value] of map.entries()) {
      yield `${key}: ${value}`;
    }
  }

  for (const entry of iterateMap(map)) {
    print(entry);
  }

   
  const validator = {
    set(target, key, value) {
      if (key === 'age' && typeof value !== 'number') {
        throw new Error('Age must be a number');
      }
      target[key] = value;
      return true;
    }
  };

  const person = new Proxy({}, validator);
  person.name = 'Charlie';
  person.age = 35;  
   

  print(person);
})();
