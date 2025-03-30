 
(async () => {
  const { readFile } = await import('fs/promises');

   
  const userValidator = {
    set: function(obj, prop, value) {
      if (prop === 'age' && (typeof value !== 'number' || value <= 0)) {
        throw new TypeError('Age must be a positive number');
      }
      if (prop === 'name' && value.length < 3) {
        throw new Error('Name should be at least 3 characters long');
      }
      obj[prop] = value;
      return true;
    }
  };

  let user = new Proxy({}, userValidator);
  user.name = 'Alice';
  user.age = 25;

   
  function* idGenerator() {
    let id = 0;
    while (true) {
      yield id++;
    }
  }

  const idIterator = idGenerator();

   
  const fileNames = ['file1.txt', 'file2.txt'];
  const fileReadPromises = fileNames.map(fileName => readFile(fileName, 'utf-8'));

  const results = await Promise.allSettled(fileReadPromises);
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      print(`Content of ${fileNames[index]}: ${result.value}`);
    } else {
      console.error(`Failed to read ${fileNames[index]}: ${result.reason}`);
    }
  });

   
  const privateData = new WeakMap();
  class SecretHolder {
    constructor(secret) {
      privateData.set(this, { secret });
    }
    getSecret() {
      return privateData.get(this).secret;
    }
  }

  const secret = new SecretHolder('The cake is a lie.');
  print(secret.getSecret());

   
  const userInfo = {
    profile: {
      email: 'alice@example.com'
    }
  };

  const email = userInfo.profile?.email ?? 'No email provided';
  print(email);

   
  print(`Generated ID: ${idIterator.next().value}`);
})();
