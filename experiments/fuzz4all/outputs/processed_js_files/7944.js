 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const processUserData = async () => {
  const userUrl = 'https://jsonplaceholder.typicode.com/users/1';
  const { name, email, address: { city } } = await fetchData(userUrl);
  
  console.log(`User Info:
  Name: ${name}
  Email: ${email}
  City: ${city}`);
  
  const postsUrl = `https: 
  const posts = await fetchData(postsUrl);

  print(`\nPosts by ${name}:`);
  posts.slice(0, 3).forEach(({ title, body }) => {
    print(`- ${title}: ${body.substring(0, 50)}...`);
  });
};

processUserData();
