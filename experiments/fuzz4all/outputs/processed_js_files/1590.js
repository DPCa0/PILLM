 
 

 
const userModule = (() => {
  const mockUserData = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" }
  ];
  
   
  const fetchUserData = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockUserData), 1000);
    });
  };

  return { fetchUserData };
})();

 
(async () => {
  try {
     
    const users = await userModule.fetchUserData();
    users.forEach(({ name, email }) => {
      print(`Name: ${name}, Email: ${email}`);
    });

     
    const userEmails = users.map(({ email }) => email);
    print(`All User Emails: ${userEmails.join(", ")}`);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
})();
