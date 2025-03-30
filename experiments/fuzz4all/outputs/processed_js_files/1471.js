 

 
const fetchData = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    const data = {
      users: [
        { id: 1, name: 'Alice', active: true },
        { id: 2, name: 'Bob', active: false },
        { id: 3, name: 'Charlie', active: true }
      ]
    };
    resolve(data);
  }, 1000);
});

 
const getActiveUsers = async () => {
  try {
    const { users } = await fetchData();
    const activeUsers = users.filter(({ active }) => active);
    return activeUsers;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

 
class UserManager {
  static instanceCount = 0;
  
  constructor() {
    this.users = [];
    UserManager.instanceCount++;
  }

  static getInstanceCount() {
    return UserManager.instanceCount;
  }

  async loadActiveUsers() {
    this.users = await getActiveUsers();
  }

  logUsers() {
    print("Active Users:", this.users);
  }
}

 
(async () => {
  const userManager1 = new UserManager();
  await userManager1.loadActiveUsers();
  userManager1.logUsers();

  const userManager2 = new UserManager();
  print("Instances Created:", UserManager.getInstanceCount());
})();
