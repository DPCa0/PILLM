const fetch = require('node-fetch');

(async function complexFeatureShowcase() {
  try {
     
    const uniqueNumbers = new Set([1, 2, 3, 3, 4, 5, 5]);
    const numberMap = new Map([...uniqueNumbers].map((num) => [num, num ** 2]));

     
    const urls = [
      'https://jsonplaceholder.typicode.com/posts/1',
      'https://jsonplaceholder.typicode.com/posts/2',
      'https://jsonplaceholder.typicode.com/posts/3'
    ];
    
    const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));

     
    const data = await Promise.all(fetchPromises);

     
    const [firstPost, ...remainingPosts] = data;

     
    const formattedOutput = remainingPosts.reduce(
      (output, post) => output + `Title: ${post.title}\nBody: ${post.body}\n\n`, 
      `First Post Title: ${firstPost.title}\nFirst Post Body: ${firstPost.body}\n\nRemaining Posts:\n`
    );

     
    const secretKey = Symbol('secret');
    const complexObject = {
      numberMap,
      [secretKey]: 'This is a hidden value',
    };

    print(formattedOutput);

     
    const { numberMap: mapOfNumbers } = complexObject;
    print('Number Map:', mapOfNumbers);

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
