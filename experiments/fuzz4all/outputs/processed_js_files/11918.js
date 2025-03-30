 
async function fetchAndProcessData() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

     
    const data = await response.json();

     
    const longPosts = data.filter(post => post.body.split(' ').length > 100);

     
    const summaries = longPosts.map(({ title, body }) => {
       
      return `Title: ${title}\nSummary: ${body.slice(0, 100)}...`;
    });

     
    const uniqueSummaries = [...new Set(summaries)];

     
    for (const [index, summary] of uniqueSummaries.entries()) {
      print(`Post #${index + 1}\n${summary}\n`);
    }
  } catch (error) {
     
    console.error('Error fetching data:', error);
  }
}

 
fetchAndProcessData();
