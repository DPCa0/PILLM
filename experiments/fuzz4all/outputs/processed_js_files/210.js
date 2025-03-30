 
import fetch from 'node-fetch';

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

     
    const { title, body } = data;
    print(`Title: ${title}\nBody: ${body}`);

     
    const validator = {
      set(target, property, value) {
        if (property === 'title' && value.length < 3) {
          throw new Error('Title is too short!');
        }
        target[property] = value;
        return true;
      }
    };

    const post = new Proxy(data, validator);
    post.title = 'New Post Title';  
     

     
    const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
    const requests = urls.map(url => fetch(url).then(res => res.json()));
    const results = await Promise.all(requests);
    results.forEach((result, index) => {
      print(`Post ${index + 1}: ${result.title}`);
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  await fetchData(url);
})();
