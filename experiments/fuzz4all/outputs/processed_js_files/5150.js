(async () => {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  };

   
  const person = { name: 'John', age: 30 };
  const handler = {
    get: (target, property) => {
      if (property === 'greeting') {
        return `Hello, my name is ${target.name} and I am ${target.age} years old.`;
      }
      return target[property];
    },
  };

  const proxiedPerson = new Proxy(person, handler);
  print(proxiedPerson.greeting);

   
  function* numberGenerator() {
    let number = 1;
    while (true) {
      yield number++;
    }
  }

  const gen = numberGenerator();
  print(gen.next().value);  
  print(gen.next().value);  

   
  const uniqueNumbers = new Set([1, 2, 3, 3, 4, 5, 5]);
  uniqueNumbers.add(6);
  print(uniqueNumbers);

   
  const map = new Map();
  map.set('name', 'Alice');
  map.set('age', 25);
  print(map.get('name'));

   
  const user = { profile: { email: 'user@example.com' } };
  print(user.profile?.email ?? 'No email provided');

   
  const key = Symbol('secret');
  const obj = { [key]: 'Sensitive Info' };
  print(obj[key]);

   
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
})();
