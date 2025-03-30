 
async function fetchDataAndProcess() {
  try {
     
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Network response was not ok');

     
    let posts = await response.json();

     
    let processedData = posts
      .filter(({ userId }) => userId % 2 === 0)  
      .map(({ id, title, body }) => ({ id, title, summary: body.slice(0, 50) }))  
      .reduce((acc, { id, title, summary }) => {
        acc[id] = { title, summary };  
        return acc;
      }, {});

     
    let handler = {
      set(target, property, value) {
        if (typeof value !== 'object' || !value.title || !value.summary) {
          throw new Error('New posts must have a title and summary');
        }
        target[property] = value;
        return true;
      },
    };

    let postsProxy = new Proxy(processedData, handler);

     
    postsProxy[101] = { title: 'New Post', summary: 'This is a new post summary.' };

    print('Processed and Proxied Data:', postsProxy);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

 
fetchDataAndProcess();
