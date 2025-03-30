 
(async () => {
  try {
     
    const fetch = (await import('node-fetch')).default;
    
     
    const fetchData = async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    };

     
    const url = 'https://jsonplaceholder.typicode.com/posts';

     
    const data = await fetchData(url);

     
    const postTitles = new Set(data.map(post => post.title));

     
    const titlesTemplate = Array.from(postTitles).map(title => `• ${title}`).join('\n');
    
    print(`Fetched Post Titles:\n${titlesTemplate}`);
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
