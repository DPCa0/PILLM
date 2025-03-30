 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: 'John Doe', email: 'john.doe@example.com', id: 123 });
    }, 2000);
  });
};

 
class User {
  constructor({ user, email, id }) {
    this.name = user;
    this.email = email;
    this.id = id;
  }

  greet() {
    print(`Hello, ${this.name}! Your email is ${this.email}.`);
  }
}

 
const handleUser = async () => {
  try {
    const data = await fetchData();
    const user = new User(data);
    user.greet();
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

 
const { name, email } = new User({ user: 'Jane Doe', email: 'jane.doe@example.com', id: 456 });
print(`Extracted Name: ${name}, Email: ${email}`);

 
handleUser();
