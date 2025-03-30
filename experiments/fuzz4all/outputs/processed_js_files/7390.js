 
async function fetchAndProcessData() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Network response was not ok');

     
    const data = await response.json();

     
    const [{ userId, title }] = data;
    
     
    const [user, comments] = await Promise.all([
      fetch(`https: 
      fetch(`https: 
    ]);

     
    const [firstComment, ...otherComments] = comments;

     
    console.log(`
      Title: ${title}
      Author: ${user.name}
      First Comment: ${firstComment.body}
      Remaining Comments: ${otherComments.length}
    `);
  } catch (error) {
     
    console.error('Error fetching data:', error);
  }
}

fetchAndProcessData();
