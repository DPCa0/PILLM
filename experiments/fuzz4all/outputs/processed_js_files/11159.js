 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { id: 1, name: 'John Doe' },
        posts: [
          { id: 1, title: 'Post 1' },
          { id: 2, title: 'Post 2' },
        ],
      });
    }, 1000);
  });
};

 
function* dataGenerator() {
  yield fetchData();
}

 
async function fetchAsyncData() {
  const iterator = dataGenerator();
  for (const promise of iterator) {
    const { user, posts } = await promise;
    print(`User: ${user.name}`);
    print('Posts:', ...posts.map(({ title }) => title));
  }
}

 
async function main() {
  try {
    await fetchAsyncData();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
(async () => {
  print('Fetching data...');
  await main();
  print('Data fetched successfully!');
})();
