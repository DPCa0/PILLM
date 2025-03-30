 

const fetchUserData = async (userId) => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        [Symbol('id')]: userId,
        name: `User${userId}`,
        age: 20 + userId,
        preferences: { color: 'blue', language: 'JavaScript' }
      });
    }, 1000);
  });
};

const fetchPosts = async (userId) => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { postId: 1, content: `User ${userId}'s first post` },
        { postId: 2, content: `User ${userId}'s second post` }
      ]);
    }, 500);
  });
};

const main = async (userId) => {
  try {
    const [userData, userPosts] = await Promise.all([fetchUserData(userId), fetchPosts(userId)]);
    
    const {
      name,
      preferences: { language }
    } = userData;

    print(`Fetched data for ${name}, who prefers ${language}.`);
    print(`Posts:`);

    userPosts.forEach(({ postId, content }) => {
      print(`Post ${postId}: ${content}`);
    });

  } catch (error) {
    console.error('An error occurred:', error);
  }
};

main(1);
