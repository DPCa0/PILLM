 

 
const fakeApi = {
  async getUser(id) {
     
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          id,
          name: "John Doe",
          email: "john.doe@example.com",
        });
      }, 1000)
    );
  },
};

 
const userHandler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    } else {
      console.warn(`Property "${property}" does not exist on user.`);
      return "Unknown Property";
    }
  },
};

 
async function fetchAndProcessUser(userId) {
  try {
    const userData = await fakeApi.getUser(userId);
     
    const { id, name, email } = userData;

     
    const proxiedUser = new Proxy({ id, name, email }, userHandler);

     
    print(`User ID: ${proxiedUser.id}`);
    print(`User Name: ${proxiedUser.name}`);
    print(`User Email: ${proxiedUser.email}`);

     
    print(`User Address: ${proxiedUser.address}`);  
  } catch (error) {
    console.error(`Error fetching user data: ${error.message}`);
  }
}

 
fetchAndProcessUser(1);
