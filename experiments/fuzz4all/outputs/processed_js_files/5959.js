 
async function complexFunction() {
   
  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
  };

  const [firstPost] = await fetchData();

   
  const postHandler = {
    set: (target, property, value) => {
      print(`Property ${property} changed from ${target[property]} to ${value}`);
      target[property] = value;
      return true;
    }
  };

  const monitoredPost = new Proxy(firstPost, postHandler);

   
  monitoredPost.title = 'Modified Title';

   
  function* dataGenerator(dataArray) {
    for (const item of dataArray) {
      yield item;
    }
  }

  const postIterator = dataGenerator(await fetchData());

   
  const results = await Promise.allSettled([
    fetch('https://jsonplaceholder.typicode.com/users'),
    fetch('https://jsonplaceholder.typicode.com/comments')
  ]);

  results.forEach((result, index) => {
    print(`Promise ${index + 1} ${result.status}`);
  });

   
  print(`First post title: ${monitoredPost?.title ?? 'No title found'}`);

   
  for (const post of postIterator) {
    if (post.id > 5) break;
    print(`Post ID: ${post.id}, Title: ${post.title}`);
  }
}

 
complexFunction().catch(err => console.error(err));
