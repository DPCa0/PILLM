 

const fetchUser = () =>
  new Promise((resolve) => setTimeout(() => resolve({ id: 1, name: "John Doe" }), 1000));

const fetchPosts = (userId) =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: 1, title: "Post 1", userId },
          { id: 2, title: "Post 2", userId },
        ]),
      1000
    )
  );

async function getUserAndPosts() {
  const { id: userId, name } = await fetchUser();

  const [firstPost, secondPost] = await fetchPosts(userId);

  print(`User: ${name}`);
  print(`First Post: ${firstPost.title}`);
  print(`Second Post: ${secondPost.title}`);
}

getUserAndPosts();
