 
async function* fetchUserData(userIds) {
  for (let id of userIds) {
    const response = await fetch(`https: 
    if (response.ok) {
      yield await response.json();
    } else {
      yield { error: `Failed to fetch user with ID ${id}` };
    }
  }
}

 
const processUserData = (users) => {
  return users
    .filter(user => !user.error)
    .map(user => ({
      fullName: `${user.name} (${user.username})`,
      email: user.email,
      website: user.website,
    }))
    .reduce((acc, user) => {
      acc[user.fullName] = user;
      return acc;
    }, {});
};

(async () => {
  const userIds = [1, 2, 3, 4, 5];
  const userData = [];
  
   
  for await (let user of fetchUserData(userIds)) {
    userData.push(user);
  }
  
   
  const { 'Leanne Graham (Bret)': leanne, ...rest } = processUserData(userData);
  
   
  print(`User: ${leanne?.fullName}\nEmail: ${leanne?.email}\nWebsite: ${leanne?.website}`);
  print('All Users:', JSON.stringify(rest, null, 2));
})();
