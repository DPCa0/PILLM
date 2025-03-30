 

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getInfo() {
    return `${this.name} <${this.email}>`;
  }
}

class Admin extends User {
  constructor(name, email, role) {
    super(name, email);
    this.role = role;
  }

  static greetUsers(users) {
    return users.map(user => `Welcome, ${user.name}!`);
  }
}

const fetchUserData = async (userId) => {
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(user => user.id === userId);
      user ? resolve(user) : reject('User not found');
    }, 1000);
  });
};

const displayUserInfo = async (userId) => {
  try {
    const userData = await fetchUserData(userId);
    const { name, email, role } = userData;
    const user = role === 'admin' ? new Admin(name, email, role) : new User(name, email);
    
    print(`User Info: ${user.getInfo()}`);
    
    if (user instanceof Admin) {
      const users = [{ name: 'Alice' }, { name: 'Bob' }];
      print(Admin.greetUsers(users));
    }

  } catch (error) {
    print(`Error: ${error}`);
  }
};

displayUserInfo(1);
displayUserInfo(3);
