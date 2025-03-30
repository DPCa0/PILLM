 
 

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  async fetchProfile() {
     
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: this.name,
          email: this.email,
          age: Math.floor(Math.random() * 50) + 20,
          address: "123 Main St"
        });
      }, 1000);
    });
  }
}

async function getUserData(users) {
  try {
    const userDataPromises = users.map(user => user.fetchProfile());
    const userData = await Promise.all(userDataPromises);
    const processedData = processUserData(userData);
    
    print("Processed User Data: ", processedData);
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
}

function processUserData(data) {
   
  return data
    .filter(user => user.age > 25)  
    .map(({ name, email, age }) => ({
       
      name,
      email,
      age,
      adult: age >= 18 ? 'Yes' : 'No'
    }));
}

 
const users = [
  new User("Alice", "alice@example.com"),
  new User("Bob", "bob@example.com"),
  new User("Charlie", "charlie@example.com")
];

getUserData(users);
