 

class Api {
  async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  }
}

const api = new Api();

const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      return target[prop];
    } else {
      return `Property "${prop}" does not exist`;
    }
  },
  set(target, prop, value) {
    if (typeof value === 'string' && value.trim() !== '') {
      target[prop] = value;
      print(`Property "${prop}" set to "${value}"`);
      return true;
    } else {
      throw new Error('Value must be a non-empty string');
    }
  }
};

(async () => {
  try {
    const userData = await api.fetchData('https://jsonplaceholder.typicode.com/users/1');
    const userProxy = new Proxy(userData, handler);

    print(userProxy.name);  
    userProxy.username = "newUsername";  
    print(userProxy.email);  
    print(userProxy.address);  

     
     

  } catch (error) {
    console.error('Error:', error);
  }
})();
