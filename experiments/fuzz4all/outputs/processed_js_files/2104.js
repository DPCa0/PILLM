 
const fetchDataAndProcess = async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();

     
    const titleWordCount = data.map(post => post.title)
                               .reduce((acc, title) => {
                                 const words = title.split(' ');
                                 words.forEach(word => {
                                   acc[word] = (acc[word] || 0) + 1;
                                 });
                                 return acc;
                               }, {});

     
    const sortedWordCount = Object.entries(titleWordCount)
                                  .sort(([, a], [, b]) => b - a);

    print('Word Frequency in Titles:', sortedWordCount);

     
    const wordCountHandler = {
      get: (target, prop) => {
        print(`Accessed word count for "${prop}": ${target[prop]}`);
        return target[prop];
      }
    };

    const proxiedWordCount = new Proxy(titleWordCount, wordCountHandler);

     
    print('Count for "lorem":', proxiedWordCount['lorem']);
    
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};

fetchDataAndProcess();
