 

 
function fetchUserData(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: `User${userId}`,
        preferences: {
          theme: 'dark',
          language: 'en'
        }
      });
    }, 1000);
  });
}

 
async function getUserPreferences(userIds) {
  const userPreferencesMap = new Map();

  for (const userId of userIds) {
    const { name, preferences } = await fetchUserData(userId);
    userPreferencesMap.set(name, preferences);
  }

  return userPreferencesMap;
}

 
async function printUserPreferences(userIds) {
  const userPreferences = await getUserPreferences(userIds);

  for (const [name, { theme, language }] of userPreferences.entries()) {
    print(`User: ${name}, Theme: ${theme}, Language: ${language}`);
  }
}

 
printUserPreferences([1, 2, 3]);
