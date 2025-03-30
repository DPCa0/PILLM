const fetchUserData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error(`Fetch failed: ${error}`);
  }
};

const processUserData = (data) => {
  return data.map(user => ({
    fullName: `${user.name.first} ${user.name.last}`,
    location: `${user.location.city}, ${user.location.country}`,
    email: user.email
  }));
};

const displayUsers = (users) => {
  users.forEach(user => {
    print(`Name: ${user.fullName}`);
    print(`Location: ${user.location}`);
    print(`Email: ${user.email}\n`);
  });
};

(async () => {
  const userData = await fetchUserData('https://randomuser.me/api/?results=5');
  if (userData) {
    const processedData = processUserData(userData.results);
    displayUsers(processedData);
  }
})();
