const fetch = require('node-fetch');

(async () => {
  try {
     
    const [userResponse, postResponse] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users/1'),
      fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
    ]);

    const user = await userResponse.json();
    const posts = await postResponse.json();

     
    print(`User: ${user?.name ?? 'Unknown'}`);
    print('Posts:');

     
    const postMap = new Map(posts.map(post => [post.id, post.title]));
    for (const [id, title] of postMap) {
      print(`Post ID: ${id}, Title: "${title}"`);
    }

     
    const { longTitles, shortTitles } = posts.reduce((acc, { title }) => {
      const category = title.length > 30 ? 'longTitles' : 'shortTitles';
      acc[category].push(title);
      return acc;
    }, { longTitles: [], shortTitles: [] });

    print('\nLong Titles:', longTitles);
    print('Short Titles:', shortTitles);

     
    const logHandler = {
      get(target, prop, receiver) {
        print(`Accessed property: ${String(prop)}`);
        return Reflect.get(target, prop, receiver);
      }
    };

    const userProxy = new Proxy(user, logHandler);
    print('Accessed Email:', userProxy.email);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
