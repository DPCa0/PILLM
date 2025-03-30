 
(async () => {
  const fs = await import('fs/promises');
  const { default: fetch } = await import('node-fetch');

   
  async function* fetchMultipleUrls(urls) {
    for (const url of urls) {
      yield fetch(url).then(res => res.json());
    }
  }

  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

   
  const fetchData = async () => {
    const [first, ...rest] = await Promise.all(fetchMultipleUrls(urls));
    return { first, rest };
  };

   
  const displayData = async () => {
    const { first, rest } = await fetchData();
    print('First post:', first);
    print('Rest of the posts:', rest);

     
    const dataString = `
      First Post:\n${JSON.stringify(first, null, 2)}
      \nRest of the Posts:\n${rest.map(post => JSON.stringify(post, null, 2)).join('\n')}
    `;
    await fs.writeFile('posts.txt', dataString);
    print('Data written to posts.txt');
  };

  displayData();
})();
