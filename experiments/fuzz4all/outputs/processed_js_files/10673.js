 

 
class User {
  constructor(name) {
    this.name = name;
  }

   
  async fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ age: 30, email: 'user@example.com' });
      }, 1000);
    });
  }

   
  async getUserInfo() {
    try {
      const { age, email } = await this.fetchData();
      return { name: this.name, age, email };
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
}

 
const displayUserInfo = ({ name, age, email } = { name: 'N/A', age: 'N/A', email: 'N/A' }) => {
  print(`Name: ${name}, Age: ${age}, Email: ${email}`);
};

 
const main = async () => {
  const user = new User('John Doe');
  const userInfo = await user.getUserInfo();
  displayUserInfo(userInfo);
};

main().catch((error) => console.error('Unhandled error:', error));
