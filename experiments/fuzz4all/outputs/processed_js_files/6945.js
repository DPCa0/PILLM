 

 
const mockDatabaseQuery = (query) => {
  const database = {
    "SELECT * FROM users": [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }],
  };
  return new Promise((resolve) => {
    setTimeout(() => resolve(database[query]), 1000);
  });
};

 
const loggingHandler = {
  get(target, property) {
    print(`Accessed property: ${property}`);
    return target[property];
  },
};

 
(async () => {
  try {
     
    const users = await mockDatabaseQuery("SELECT * FROM users");

     
    const [firstUser] = users;
    print(`Fetched user: ${firstUser.name}`);

     
    const proxiedUser = new Proxy(firstUser, loggingHandler);

     
    print(`User ID: ${proxiedUser.id}`);
    print(`User Name: ${proxiedUser.name}`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
