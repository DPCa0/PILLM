 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: { id: 1, name: 'Alice', email: 'alice@example.com' }, status: 200 });
    }, 1000);
  });
};

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property "${prop}" with value "${target[prop]}"`);
      return target[prop];
    } else {
      print(`Property "${prop}" does not exist`);
      return undefined;
    }
  },
};

 
(async () => {
  try {
    const { user, status } = await fetchData();  
    const proxyUser = new Proxy(user, handler);  

    print(`Response status: ${status}`);
    print(`User Name: ${proxyUser.name}`);  
    print(`User Email: ${proxyUser.email}`);  
    print(`User Age: ${proxyUser.age}`);  

     
    if (status === 200) {
      const { default: greet } = await import('./greet.js');
      greet(proxyUser.name);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

Contents of `greet.js`:
 
export default (name) => {
  print(`Welcome, ${name}!`);
};
