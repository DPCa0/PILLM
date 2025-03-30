 

async function fetchData() {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          user: { id: 1, name: 'Alice', email: 'alice@example.com' },
          posts: [
            { id: 101, title: 'First Post', body: 'This is my first post' },
            { id: 102, title: 'Second Post', body: 'Hello again!' },
          ],
        }),
      1000
    )
  );
}

(async () => {
  try {
     
    const { user, posts } = await fetchData();

     
    function createUserHandler({ id, name }) {
      let userId = id;
      let userName = name;

       
      return {
        greet: () => console.log(`Hello, ${userName}!`),
        getId: () => userId,
      };
    }

    const userHandler = createUserHandler(user);

     
    userHandler.greet();

     
    posts.forEach(({ id, title, body }) => {
      print(`Post ID: ${id}\nTitle: ${title}\nContent: ${body}\n`);
    });

     
    print(`User ID: ${userHandler.getId()}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
