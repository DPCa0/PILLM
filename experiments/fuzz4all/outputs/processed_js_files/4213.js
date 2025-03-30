 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        posts: [
          { id: 101, title: 'Post One', content: 'Content of post one' },
          { id: 102, title: 'Post Two', content: 'Content of post two' }
        ]
      });
    }, 1000);
  });
};

 
class UserProfile {
  constructor(user, posts) {
    this.user = user;
    this.posts = posts;
  }

  getUserInfo() {
    const { name, email } = this.user;
    return `User: ${name}, Email: ${email}`;
  }

  getUserPosts() {
    return this.posts.map(({ title, content }) => `${title}: ${content}`).join('\n');
  }
}

 
(async () => {
  try {
    const { user, posts } = await fetchData();
    const userProfile = new UserProfile(user, posts);

    print(userProfile.getUserInfo());
    print('Posts:\n', userProfile.getUserPosts());
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
