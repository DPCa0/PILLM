 
const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = async () => {
  const dataUrl = 'https://jsonplaceholder.typicode.com/posts';
  let data = await fetchData(dataUrl);

  if (data && Array.isArray(data)) {
     
    const [firstPost, ...remainingPosts] = data;
    
     
    const postTitlesLength = remainingPosts.map(post => post.title.length).reduce((acc, length) => acc + length, 0);
    
     
    print(`First post title: ${firstPost?.title || 'N/A'}\nTotal length of remaining titles: ${postTitlesLength}`);
  }
};

processData();
