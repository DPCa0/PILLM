 

 
const fakeApi = (endpoint) => new Promise((resolve) => {
  setTimeout(() => {
    const data = {
      '/user': { id: 1, name: 'John Doe' },
      '/posts': [{ id: 1, title: 'Hello World' }, { id: 2, title: 'Advanced JS' }],
      '/comments': [{ postId: 1, text: 'Great post!' }, { postId: 2, text: 'Very informative!' }]
    };
    resolve(data[endpoint]);
  }, Math.random() * 1000);
});

 
function* apiSequence() {
  yield fakeApi('/user');
  yield fakeApi('/posts');
  yield fakeApi('/comments');
}

 
const fetchData = async (sequence) => {
  for (let request of sequence) {
    const data = await request;
    print(data);
  }
};

 
(async () => {
  const gen = apiSequence();
  const [user, posts, comments] = await Promise.all(Array.from({length: 3}, () => gen.next().value));
  
   
  const { name } = user;
  print(`User: ${name}`);
  print('Posts:');
  posts.forEach(({ title }) => print(`- ${title}`));
  print('Comments:');
  comments.forEach(({ text }) => print(`* ${text}`));
  
   
  print('\nFetching Data Sequentially:');
  await fetchData(apiSequence());
})();
