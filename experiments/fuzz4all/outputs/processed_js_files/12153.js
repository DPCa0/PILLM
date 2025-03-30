 

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      user: 'John Doe',
      email: 'john.doe@example.com',
      favorites: ['JavaScript', 'Node.js', 'React']
    });
  }, 1000);
});

 
async function getUserData() {
  try {
     
    const { user, email, favorites } = await fetchData();

     
    const [firstFav, ...otherFavs] = favorites;
    const newFavorites = ['TypeScript', ...otherFavs];

     
    print(`User: ${user}`);
    print(`Email: ${email}`);
    print(`First favorite: ${firstFav}`);
    print(`Updated favorites: ${newFavorites.join(', ')}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
(async () => {
  await getUserData();
})();
