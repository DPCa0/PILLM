 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const data = await fetchData(url);
  
  if (data) {
    const topPosts = data.slice(0, 5);
    
    topPosts.forEach(({ id, title, body }, index) => {
      print(`Post ${index + 1}`);
      print('ID:', id);
      print('Title:', title);
      print('Body:', body);
      print('---');
    });

     
    const combinedPosts = [...topPosts, { id: 999, title: 'New Post', body: 'This is a new post' }];
    print('Combined Posts:', combinedPosts);
  }
};

processData();
