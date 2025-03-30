 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        user: 'Alice',
        email: 'alice@example.com',
        favorites: ['JavaScript', 'React', 'Node.js'],
      };
      resolve(data);
    }, 1000);
  });
};

 
const processUserData = (processFn) => async (url) => {
  try {
    const data = await fetchData(url);
    processFn(data);
  } catch (error) {
    console.error('Error processing user data:', error);
  }
};

 
const displayUserInfo = ({ user, email, favorites }) => {
  print(`User: ${user}`);
  print(`Email: ${email}`);
  print('Favorites:');
  favorites.forEach((item, index) => print(`${index + 1}. ${item}`));
};

 
const execute = processUserData(displayUserInfo);

 
execute('https://example.com/api/user');
