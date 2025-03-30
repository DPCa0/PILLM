 
async function getRandomUser() {
  const response = await fetch('https://randomuser.me/api/');
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  const data = await response.json();
  return data.results[0];
}

 
function createUserProxy(user) {
  return new Proxy(user, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      } else {
        console.warn(`Property ${prop} does not exist on user object.`);
        return undefined;
      }
    },
    set(target, prop, value) {
      print(`Setting value for ${prop} to ${value}`);
      target[prop] = value;
      return true;
    }
  });
}

 
const userMap = new Map();

async function main() {
  try {
    const user = await getRandomUser();
    const userId = Symbol('userId');
    const userProxy = createUserProxy(user);
    
    userMap.set(userId, userProxy);

    print(`User's first name is: ${userProxy.name.first}`);
    print(`User's last name is: ${userProxy.name.last}`);
    
     
    print(`User's favorite color is: ${userProxy.favoriteColor}`);

    // Modifying a user property
    userProxy.email = "new.email@example.com";
    print(`Updated email: ${userProxy.email}`);
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
}

main();
