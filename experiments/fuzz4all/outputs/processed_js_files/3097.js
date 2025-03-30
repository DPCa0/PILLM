 

class DataFetcher {
  static async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }
}

async function processData() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const data = await DataFetcher.fetchData(url);
  if (data) {
     
    const [firstPost, ...otherPosts] = data;
    const { id, title, body } = firstPost;

    console.log(`First Post:
      ID: ${id}
      Title: ${title}
      Body: ${body}
    `);

     
    const updatedPosts = [{ id: 0, title: 'New Post', body: 'This is a new post.' }, ...otherPosts];

    print('Updated posts with new post added at the beginning:', updatedPosts);
  }
}

processData();
