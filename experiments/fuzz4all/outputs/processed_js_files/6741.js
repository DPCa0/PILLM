 
const fetchUserData = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = { 1: "Alice", 2: "Bob", 3: "Charlie" };
      users[userId] ? resolve(users[userId]) : reject("User not found");
    }, 1000);
  });
};

 
async function displayUserData(userId) {
  try {
     
    const data = (await fetchUserData(userId)) ?? "No user";
    print(`User Data: ${data}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

 
(async () => {
  const userIds = [1, 2, 4];
  
   
  const results = await Promise.allSettled(userIds.map(id => fetchUserData(id)));

   
  const [first, ...rest] = results;

  if (first.status === "fulfilled") {
    print(`First result: ${first.value}`);
  }

   
  for (const { status, value, reason } of rest) {
    print(`Status: ${status}, Result: ${value ?? reason}`);
  }

   
  let processedCount = 0;
  processedCount ||= userIds.length;
  print(`Processed ${processedCount} users`);
})();

