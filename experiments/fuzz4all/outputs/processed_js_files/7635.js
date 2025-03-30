 
class User {
  #password;
  
  constructor(username, password) {
    this.username = username;
    this.#password = password;
  }
  
   
  checkPassword(inputPassword) {
    return this.#password === inputPassword;
  }

   
  static isValidUsername(username) {
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
  }
}

 
async function fetchUserData(username) {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (User.isValidUsername(username)) {
        resolve(new User(username, 'securePassword123'));
      } else {
        reject(new Error('Invalid username format'));
      }
    }, 1000);
  });
}

 
(async () => {
  try {
    const user = await fetchUserData('valid_username');
    print(`User ${user.username} fetched.`);

     
    const userProxy = new Proxy(user, {
      get(target, prop, receiver) {
        const originalMethod = target[prop];
        if (typeof originalMethod === 'function') {
          return function (...args) {
            print(`Calling ${prop} with arguments: ${args}`);
            return originalMethod.apply(this, args);
          };
        }
        return Reflect.get(target, prop, receiver);
      }
    });

    print('Password check:', userProxy.checkPassword('securePassword123'));
  } catch (error) {
    console.error(error);
  }
})();
