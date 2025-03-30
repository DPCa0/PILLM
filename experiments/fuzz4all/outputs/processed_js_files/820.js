 

 
async function fetchUserData(userId) {
  try {
    const response = await fetch(`https: 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error(`Failed to fetch user data: ${error}`);
    return null;
  }
}

 
async function processUserData(userId) {
  const userData = await fetchUserData(userId);
  if (userData) {
    print(`User ID: ${userData.id}`);
    print(`Name: ${userData.name}`);
    print(`Email: ${userData.email}`);
    print(`Address: ${userData.address.street}, ${userData.address.city}`);
  } else {
    print('Could not retrieve user data.');
  }
}

 
async function* userGenerator(userIds) {
  for (const id of userIds) {
    yield await fetchUserData(id);
  }
}

 
async function handleMultipleUsers(userIds) {
  const userPromises = userIds.map(userId => fetchUserData(userId));

   
  try {
    const users = await Promise.all(userPromises);
    users.forEach(user => {
      if (user) {
        print(`User: ${user.name} (${user.email})`);
      }
    });
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
  }
}

 
async function logUsers(userIds) {
  for await (const user of userGenerator(userIds)) {
    if (user) {
      print(`Generated User: ${user.name} (${user.email})`);
    }
  }
}

 
processUserData(1);
handleMultipleUsers([2, 3, 4]);
logUsers([5, 6, 7]);
