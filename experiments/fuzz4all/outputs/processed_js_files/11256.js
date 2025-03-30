 
const fetchUserData = async (userId) => {
   
  const response = await fetch(`https: 
  const user = await response.json();

   
  const city = user.address?.city ?? 'Unknown';
  
   
  print(`User's Name: ${user.name}, City: ${city}`);

  // Demonstrating use of Promise.all and Destructuring
  const [postsResponse, albumsResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`),
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
  ]);

  const [posts, albums] = await Promise.all([
    postsResponse.json(),
    albumsResponse.json()
  ]);

  // Using Spread Operator and Map
  const postTitles = posts.map(post => post.title);
  const albumTitles = albums.map(album => album.title);

  // Using Set and Spread to get unique titles
  const uniqueTitles = [...new Set([...postTitles, ...albumTitles])];

  // Using Arrow Functions with forEach
  uniqueTitles.forEach(title => print(`Title: ${title}`));

  // Using Proxy to create a handler for log operations
  const handler = {
    get: (target, prop) => {
      print(`Property '${prop}' accessed`);
      return target[prop];
    }
  };

  const proxyUser = new Proxy(user, handler);
  print(proxyUser.name); // Triggers proxy handler
};

// Immediately Invoked Function Expression (IIFE)
(async () => {
  try {
    await fetchUserData(1);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
})();
