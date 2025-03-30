 

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  static async fetchUsers() {
    const data = await fetch('https://jsonplaceholder.typicode.com/users');
    return await data.json();
  }
}

const userAgeClosure = () => {
  let age = 0;
  return {
    increment: () => ++age,
    getAge: () => age,
  };
};

const main = async () => {
  const usersData = await User.fetchUsers();
  
  const users = usersData.map(user => new User(user.name, userAgeClosure()));

  users.forEach(user => {
    print(`Fetching details for: ${user.name}`);
    print(`Initial Age: ${user.age.getAge()}`);
    user.age.increment();
    user.age.increment();
    print(`Updated Age: ${user.age.getAge()}`);
  });

   
  const additionalData = { city: 'Metropolis', country: 'Fictionland' };
  const detailedUser = { ...users[0], ...additionalData };
  
  print(`Detailed User: ${detailedUser.name} from ${detailedUser.city}, ${detailedUser.country}`);
};

 
main().catch(error => console.error(`Error in main execution: ${error}`));
