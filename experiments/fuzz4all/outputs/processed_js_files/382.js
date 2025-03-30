 

 
function* fetchUserData(userIds) {
  for (let id of userIds) {
    yield fetch(`https: 
      .then(response => response.json());
  }
}

 
async function handleFetch(userIds) {
  const generator = fetchUserData(userIds);
  const usersData = [];

  for (let fetchPromise of generator) {
    try {
      const userData = await fetchPromise;
      const { name, email, address: { city } } = userData;  
      usersData.push({ name, email, city });
    } catch (error) {
      console.error(`Error fetching user data: ${error}`);
    }
  }

  return usersData;
}

 
(async () => {
  const userIds = [1, 2, 3];
  const usersData = await handleFetch(userIds);
  
  print('User Information:');
  usersData.forEach(({ name, email, city }) => {
    print(`Name: ${name}, Email: ${email}, City: ${city}`);
  });
})();
