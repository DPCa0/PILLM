 

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Getting ${property}: ${target[property]}`);
      return target[property];
    } else {
      console.warn(`Property ${property} does not exist.`);
    }
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const user = new Proxy({}, handler);

 
const updateUserDetails = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      user.name = 'Alice';
      user.age = 30;
      resolve('User details updated');
    }, 2000);
  });
};

 
const favoriteNumbers = new Set([1, 2, 3, 4, 5]);

const process = async () => {
  print('Starting process...');
  
   
  const message = await updateUserDetails();
  print(message);

   
  print('Favorite Numbers:');
  favoriteNumbers.forEach((num) => print(num));

   
  print(`User name: ${user.name}`);
  print(`User age: ${user.age}`);
  
   
  print(`User address: ${user.address}`);
};

process();
