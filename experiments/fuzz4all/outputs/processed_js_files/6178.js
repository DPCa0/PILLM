const fetch = require('node-fetch');

 
(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

     
    const [firstPost, ...otherPosts] = posts;
    print(`First Post: ${firstPost.title}`);

     
    const titles = posts.map(({ title }) => title);
    print('All Post Titles:', titles);

     
    const allWords = titles.flatMap(title => title.split(' '));
    const uniqueWords = [...new Set(allWords)];
    print('Unique Words in Titles:', uniqueWords);

     
    const user = { name: 'John Doe', age: 30 };
    const handler = {
      set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
      }
    };
    const proxyUser = new Proxy(user, handler);
    proxyUser.age = 31;

  } catch (error) {
    console.error('Error fetching posts:', error);
  }
})();
