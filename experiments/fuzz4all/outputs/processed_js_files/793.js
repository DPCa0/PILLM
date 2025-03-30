 
(async () => {
  const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

  try {
     
    const response = await fetch(apiEndpoint);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const posts = await response.json();

     
    const [{ userId, id, title }] = posts;

     
    const highlight = (strings, ...values) => {
      return strings.reduce((acc, str, i) => {
        return `${acc}${str}<strong>${values[i] || ''}</strong>`;
      }, '');
    };

     
    const postTitles = posts
      .filter(post => post.userId === userId)
      .map(({ title }) => title);

    print(highlight`User ID: ${userId}, Post ID: ${id}, First Post Title: ${title}`);
    print('Other post titles by the same user:', postTitles);

     
    const uniqueUserIds = [...new Set(posts.map(post => post.userId))];
    print('Unique User IDs:', uniqueUserIds);

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
