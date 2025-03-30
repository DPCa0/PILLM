 

 
const fetchData = async () => {
  const fakeApiData = () => new Promise((resolve) =>
    setTimeout(() => resolve({ user: { name: 'Alice', age: 28 }, posts: [{ id: 1, title: 'Hello World' }, { id: 2, title: 'Advanced JS' }] }), 1000)
  );

  try {
    const { user, posts } = await fakeApiData();
    print(`User: ${user.name}, Age: ${user.age}`);
    const postTitles = posts.map(({ title }) => title).join(', ');
    print(`Posts: ${postTitles}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const aggregateData = (label, ...data) => ({
  [label]: [...data]
});

 
const formatMessage = (strings, name, age) => `${strings[0]}${name}${strings[1]}${age}${strings[2]}`;

const message = formatMessage`User ${'Alice'} is ${28} years old.`;

 
(async () => {
  print('Fetching data...');
  await fetchData();
  
  const aggregated = aggregateData('Numbers', 1, 2, 3, 4, 5);
  print('Aggregated Data:', aggregated);

  print('Formatted Message:', message);
})();
