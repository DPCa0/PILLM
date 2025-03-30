 
const fetchUserData = async (userId) => {
   
  const getUser = new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = {
        1: { name: "Alice", email: "alice@example.com" },
        2: { name: "Bob", email: "bob@example.com" }
      };
      users[userId] ? resolve(users[userId]) : reject("User not found");
    }, 1000);
  });

  try {
    const user = await getUser;
    const { name, email } = user;
    print(`User Info: \nName: ${name} \nEmail: ${email}`);
  } catch (error) {
    console.error(error);
  }
};

 
(async () => {
  const userId = 1;
  await fetchUserData(userId);
})();
