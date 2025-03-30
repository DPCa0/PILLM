 
(async () => {
  const { randomBytes } = await import('crypto');

   
  const handler = {
    get: (target, prop) => {
      if (prop in target) {
        print(`Accessing property "${prop}" with value ${target[prop]}`);
        return target[prop];
      } else {
        console.warn(`Property "${prop}" does not exist`);
        return undefined;
      }
    },
  };

   
  const user = { name: 'Alice', role: 'Developer' };
  const proxyUser = new Proxy(user, handler);

   
  print(proxyUser.name);  
  print(proxyUser.age);   

   
  const translation = (strings, ...keys) => {
    const translations = {
      welcome: 'Bienvenue',
      user: 'Utilisateur'
    };
    return strings.reduce((result, str, i) => {
      const key = keys[i - 1];
      return result + (translations[key] || key) + str;
    });
  };
  
  const username = 'Bob';
  print(translation`Welcome ${'welcome'}, ${'user'} ${username}!`);

   
  async function generateSecureToken(size = 48) {
    return new Promise((resolve, reject) => {
      randomBytes(size, (err, buffer) => {
        if (err) reject(err);
        resolve(buffer.toString('hex'));
      });
    });
  }

  const token = await generateSecureToken();
  print(`Generated Token: ${token}`);
})();
