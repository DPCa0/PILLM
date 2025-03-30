 

 
const userModule = (() => {
  const users = new Map();

  const addUser = ({ id, name, email }) => {
    if (!id || !name || !email) throw new Error("Incomplete user data");
    users.set(id, { name, email });
  };

  const getUser = (id) => users.get(id);

  const getAllUsers = () => Array.from(users.values());

  return { addUser, getUser, getAllUsers };
})();

 
const fetchUserData = async (id) => {
  const fakeApiDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  await fakeApiDelay(1000);  

  return { id, name: `User${id}`, email: `user${id}@example.com` };
};

(async () => {
   
  try {
    const ids = [1, 2, 3];
    const userPromises = ids.map(id => fetchUserData(id));
    
    const users = await Promise.all(userPromises);
    users.forEach(user => userModule.addUser(user));

     
    const [firstUser] = userModule.getAllUsers();
    const { name, email } = firstUser;
    
    print(`First user: ${name}, Email: ${email}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
