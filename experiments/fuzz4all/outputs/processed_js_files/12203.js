 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ status: 200, data: { user: { name: 'Alice', age: 30, active: true } } });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
};

 
class User {
  constructor({ name, age, active }) {
    this.name = name;
    this.age = age;
    this.active = active;

     
    return new Proxy(this, {
      set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
      }
    });
  }

   
  displayInfo = () => {
    print(`User: ${this.name}, Age: ${this.age}, Active: ${this.active}`);
  }
}

 
(async () => {
  try {
    const response = await fetchData('https://api.example.com/data');
    const user = new User(response.data.user);
    
     
    const status = response?.status ?? 'Unknown status';

    print(`Fetch Status: ${status}`);
    user.displayInfo();

     
    user.email = 'alice@example.com';
    print(`User Email: ${user.email}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
