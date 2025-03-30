 

class UserData {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get userInfo() {
    return `${this.name} is ${this.age} years old.`;
  }
}

 
const fetchUserData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;  
      if (success) {
        resolve({ name: 'Alice', age: 28 });
      } else {
        reject('Failed to fetch user data.');
      }
    }, 2000);
  });
};

 
async function displayUserInfo() {
  try {
     
    const { name, age } = await fetchUserData();
    const user = new UserData(name, age);

     
    print(`User Info: ${user.userInfo}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

 
(async () => {
  print('Fetching user data...');
  await displayUserInfo();
})();
