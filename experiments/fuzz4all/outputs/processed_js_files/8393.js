 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { user: 'John Doe', age: 30 };
      Math.random() > 0.2 ? resolve(data) : reject(new Error('Failed to fetch data'));
    }, 1000);
  });
}

 
async function displayUserData() {
  try {
    const data = await fetchData('https://api.example.com/user');
    print('User Data:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

 
(async () => {
  const defaultUser = { user: 'Anonymous', age: 0 };
  await displayUserData();

  const userSettings = { theme: 'dark', language: 'en' };
  const { theme, ...settings } = { ...defaultUser, ...userSettings };

  print(`Applied Settings: Theme - ${theme}, Rest -`, settings);
})();
