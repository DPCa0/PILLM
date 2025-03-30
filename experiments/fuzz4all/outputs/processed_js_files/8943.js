 

 
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

   
  async fetchDetails() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ age: 30, location: 'Earth' });
      }, 1000);
    });
  }

   
  static printUserDetails(...users) {
    users.forEach(({ id, name, ...details }) => {
      print(`User ${id}: ${name}, Details:`, details);
    });
  }
}

(async () => {
   
  const user1 = new User(1, 'Alice');
  const user2 = new User(2, 'Bob');
  
   
  const userDetails = await Promise.all([user1.fetchDetails(), user2.fetchDetails()]);

   
  const [aliceDetails, bobDetails] = userDetails;
  const alice = { ...user1, ...aliceDetails };
  const bob = { ...user2, ...bobDetails };

   
  User.printUserDetails(alice, bob);
})();
