const crypto = require('crypto');

 
const user = {
  name: 'Alice',
  email: 'alice@example.com',
  password: 's3cr3t',
  roles: ['admin', 'user']
};

 
const userProxy = new Proxy(user, {
  get(target, prop) {
    print(`Accessed property: ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Updated property: ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
});

 
async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = await new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('hex'));
    });
  });
  return `${salt}:${hash}`;
}

 
(async () => {
  try {
     
    print(userProxy.name);

     
    userProxy.password = await hashPassword(userProxy.password);
    print('Hashed Password:', userProxy.password);

     
    print('User Role:', userProxy.roles?.[0] ?? 'guest');

     
    print(`Welcome ${userProxy.name}, your email is: ${userProxy.email}`);
  } catch (err) {
    console.error('An error occurred:', err);
  }
})();
