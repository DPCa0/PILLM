 
import crypto from 'crypto';

 
async function advancedFeaturesDemo() {
  try {
     
    const userRoles = new Map([
      ['alice', 'admin'],
      ['bob', 'editor'],
      ['charlie', 'viewer']
    ]);

     
    const userRoleCheck = async (user) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (userRoles.has(user)) {
            resolve(`User ${user} has role ${userRoles.get(user)}`);
          } else {
            reject(`User ${user} not found`);
          }
        }, 1000);
      });
    };

     
    const users = [...userRoles.keys()];
    const results = await Promise.all(users.map(user => userRoleCheck(user)));
    print(results);

     
    const password = 'securePassword123';
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    print(`SHA-256 hash of "${password}": ${hash}`);

     
    const handler = {
      get: (obj, prop) => {
        return prop in obj ? obj[prop] : `No such property: ${prop}`;
      }
    };
    const proxyUserRoles = new Proxy(userRoles, handler);
    print(`Trying to get admin: ${proxyUserRoles.get('alice')}`);
    print(`Trying to get non-existent user: ${proxyUserRoles.get('dave')}`);

  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

 
advancedFeaturesDemo();
