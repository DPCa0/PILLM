 
async function fetchData() {
  try {
     
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
     
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
     
    let data = await response.json();

     
    let uniqueUserIds = [...new Set(data.map(post => post.userId))];
    let userPostsMap = new Map();

    uniqueUserIds.forEach(userId => {
      let userPosts = data.filter(post => post.userId === userId);
      userPostsMap.set(userId, userPosts);
    });

     
    userPostsMap.forEach((posts, userId) => {
      print(`User ${userId} has ${posts.length} posts:`);
      posts.forEach(post => {
        print(`- ${post.title}`);
      });
    });

     
    function highlight(strings, ...values) {
      return strings.reduce((acc, str, i) => {
        return `${acc}${str}<strong>${values[i] || ''}</strong>`;
      }, '');
    }

    const user = 'John Doe';
    const message = highlight`Hello, ${user}! You have new notifications.`;

     
    print(message);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
fetchData();
