 
async function fetchAndProcessData() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
     
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

     
    const data = await response.json();

     
    const wordCount = data
      .map(post => post.body.split(' ').length)  
      .reduce((acc, count) => acc + count, 0);  

     
    print(`Total number of words across all posts: ${wordCount}`);

     
    const uniqueUsers = new Set(data.map(post => post.userId));

     
    const usersArray = [...uniqueUsers];
    print('Unique user IDs:', usersArray);
    
     
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve('Async operation complete!'), 1000);
    });

     
    const result = await promise;
    print(result);
    
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

 
(async () => await fetchAndProcessData())();
