 

 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: {
          users: [
            { id: 1, name: 'Alice', age: 28 },
            { id: 2, name: 'Bob', age: 35 },
            { id: 3, name: 'Charlie', age: 22 }
          ]
        }
      });
    }, 1000);
  });
}

 
const userHandler = {
  get: (target, property) => {
    print(`Accessing ${property}`);
    return property in target ? target[property] : 'Property not found';
  },
  set: (target, property, value) => {
    if (property === 'age' && (value < 0 || value > 120)) {
      print('Invalid age');
      return false;
    }
    target[property] = value;
    return true;
  }
};

(async function main() {
  try {
    const { data: { users } } = await fetchData('https://api.example.com/users');
    
     
    const [{ name: firstUserName }, , { name: thirdUserName }] = users;

    print(`First User: ${firstUserName}, Third User: ${thirdUserName}`);
    
     
    const userProxy = new Proxy(users[0], userHandler);
    
     
    print(userProxy.name);  
    print(userProxy.age);   
    
     
    userProxy.age = 30;           
    print(userProxy.age);   

    userProxy.age = 130;          

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
