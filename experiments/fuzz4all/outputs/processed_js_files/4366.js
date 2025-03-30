 
async function fetchData(url) {
  try {
     
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();

     
    let wordCount = new Map();
    data.forEach(item => {
      item.title.split(' ').forEach(word => {
        word = word.toLowerCase();
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
      });
    });

     
    let sortedWords = Array.from(wordCount).sort((a, b) => b[1] - a[1]);

     
    print('Top 5 most common words:');
    sortedWords.slice(0, 5).forEach(([word, count]) => {
      print(`${word}: ${count}`);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
(async () => {
  const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';
  await fetchData(apiEndpoint);
})();
