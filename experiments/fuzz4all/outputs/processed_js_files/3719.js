 
(async function() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Network response was not ok');

    const posts = await response.json();

     
    const titleLengths = posts.map(post => post.title.length);
    const averageTitleLength = titleLengths.reduce((sum, len) => sum + len, 0) / titleLengths.length;

     
    const words = posts.flatMap(post => post.title.split(' '));
    const uniqueWords = new Set(words);

     
    function highlight(strings, ...values) {
      return strings.reduce((result, str, i) => `${result}${str}<strong>${values[i] || ''}</strong>`, '');
    }

     
    print(highlight`Average Title Length: ${averageTitleLength}`);
    print(highlight`Unique Words Count: ${uniqueWords.size}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
