 

 
async function fetchUserData(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userId,
        name: "John Doe",
        email: "john.doe@example.com",
        address: {
          street: "123 Main St",
          city: "Anytown",
          zip: "12345",
        },
        posts: [
          { title: "First Post", content: "Hello world!" },
          { title: "Second Post", content: "Another post!" },
        ],
      });
    }, 1000);
  });
}

 
async function updateUserData(userId, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      print(`Updated user ${userId} data:`, data);
      resolve(data);
    }, 1000);
  });
}

 
(async function main() {
  try {
    const userId = 1;
    const userData = await fetchUserData(userId);
    
     
    const {
      name,
      email,
      address: { street, city, zip },
      posts,
    } = userData;

    print(`User: ${name}, Email: ${email}`);
    print(`Address: ${street}, ${city}, ${zip}`);

     
    const postTitles = posts.map(({ title }) => title.toUpperCase());
    print(`Post Titles: ${postTitles.join(", ")}`);

     
    const newAddress = { ...userData.address, city: "New City" };
    const updatedUserData = await updateUserData(userId, {
      ...userData,
      address: newAddress,
    });

    print("Updated user data:", updatedUserData);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
