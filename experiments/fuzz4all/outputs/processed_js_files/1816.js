 

 
const userMap = new Map([
  [1, { name: "Alice", age: 28 }],
  [2, { name: "Bob", age: 35 }],
  [3, { name: "Charlie", age: 32 }]
]);

 
const fetchUser = userId => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = userMap.get(userId);
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not found"));
      }
    }, 1000);
  });
};

 
const displayUserInfo = async userId => {
  try {
    const user = await fetchUser(userId);
    print(`User Info - Name: ${user.name}, Age: ${user.age}`);
  } catch (error) {
    console.error(error.message);
  }
};

 
(async () => {
  print("Fetching user information...");

   
  await Promise.all([...userMap.keys()].map(displayUserInfo));

  print("Done fetching user information.");
})();
