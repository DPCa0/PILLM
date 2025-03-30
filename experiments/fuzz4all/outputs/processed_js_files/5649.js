 
(async () => {
  const { createInterface } = await import('readline');
  const { promises: fs } = await import('fs');

   
  const question = (query) => new Promise((resolve) => rl.question(query, resolve));

   
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
     
    const data = await fs.readFile('./data.txt', 'utf8');
    print('File content:', data);

     
    const handler = {
      set: (obj, prop, value) => {
        if (prop === 'age' && (!Number.isInteger(value) || value <= 0)) {
          throw new TypeError('Age must be a positive integer');
        }
        obj[prop] = value;
        return true;
      }
    };

    const user = new Proxy({}, handler);

     
    user.name = await question('Enter your name: ');
    user.age = parseInt(await question('Enter your age: '), 10);

     
    const { name = 'Anonymous', age = 18 } = user;
    print(`Hello, ${name}! You are ${age} years old.`);

     
    setTimeout(() => print('This is a delayed message!'), 2000);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
  }
})();
