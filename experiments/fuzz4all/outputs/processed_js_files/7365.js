 
async function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "User " + userId, role: userId % 2 === 0 ? 'Admin' : 'User' });
      } else {
        reject('Invalid user ID');
      }
    }, 1000);
  });
}

 
function timestamped(strings, ...values) {
  return `[${new Date().toISOString()}] ` + strings.reduce((prev, curr, i) => prev + curr + (values[i] || ''), '');
}

 
(async () => {
  const users = [1, 2, 3, -1];  

   
  const userPromises = new Map(users.map(userId => [userId, fetchUserData(userId).catch(err => ({ error: err }))]));

   
  for (let [userId, userPromise] of userPromises) {
    try {
      const { id, name, role, error } = await userPromise;
      if (error) throw error;   
      print(timestamped`${name} (${role}) has ID: ${id}`);
    } catch (err) {
      console.error(timestamped`Error fetching data for user ID ${userId}: ${err}`);
    }
  }
})();
