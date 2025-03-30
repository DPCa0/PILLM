 

 
const fetchUserData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        address: {
          street: '123 Main St',
          city: 'Metropolis',
          country: 'Utopia'
        },
        posts: [
          { title: 'Post One', content: 'This is post one' },
          { title: 'Post Two', content: 'This is post two' },
        ]
      });
    }, 1000);
  });

 
const displayUserData = async () => {
  try {
    const userData = await fetchUserData();

     
    const {
      name,
      email,
      address: { city, country },
      posts: [, secondPost]  
    } = userData;

     
    console.log(`
      User Info:
      Name: ${name}
      Email: ${email}
      Location: ${city}, ${country}

      Latest Post:
      Title: ${secondPost.title}
      Content: ${secondPost.content}
    `);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

 
displayUserData();
