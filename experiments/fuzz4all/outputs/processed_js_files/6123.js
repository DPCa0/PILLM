 
const fetchDataAndProcess = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

     
    const titles = data.map(({ title }) => title.toUpperCase());

     
    const wordCount = titles.reduce((acc, title) => {
      title.split(' ').forEach(word => {
        acc[word] = (acc[word] || 0) + 1;
      });
      return acc;
    }, {});

    print('Word Count:', wordCount);

     
    const sortedWordCount = Object.entries(wordCount).sort(([, a], [, b]) => b - a);

     
    const top5Words = sortedWordCount.slice(0, 5);

    print('Top 5 Words:', top5Words);
  } catch (error) {
    console.error('Fetching data failed:', error);
  }
};

 
(async () => {
  await fetchDataAndProcess();
})();
