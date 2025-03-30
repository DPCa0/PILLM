 
async function fetchAndProcessData() {
  try {
     
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Network response was not ok');

    let data = await response.json();

     
    let processedData = data.map(({ userId, id, title }) => ({
      user: `User ${userId}`,
      postId: id,
      title: title.toUpperCase(),
    }));

     
    let uniqueUsers = new Set(processedData.map(item => item.user));

     
    print(`Processed Data:\n`, ...processedData);
    print(`Unique Users: ${[...uniqueUsers].join(', ')}`);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

 
(async () => {
  await fetchAndProcessData();
})();
