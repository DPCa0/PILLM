 
async function fetchData() {
    const API_URL = 'https://jsonplaceholder.typicode.com/posts';

    try {
         
        let response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');

         
        let data = await response.json();

         
        let titles = data.map(({ title }) => title);

         
        let uniqueWords = new Set(titles.flatMap(title => title.split(' ')));

         
        let wordCount = new Map();

         
        uniqueWords.forEach(word => {
            let count = titles.reduce((acc, title) => {
                return acc + (title.split(' ').includes(word) ? 1 : 0);
            }, 0);
            wordCount.set(word, count);
        });

         
        let sortedWordCount = new Map([...wordCount.entries()].sort((a, b) => b[1] - a[1]));

         
        let mostCommonWord = [...sortedWordCount.keys()][0] ?? 'No Words Found';
        let occurrence = sortedWordCount.get(mostCommonWord) ?? 0;

        print(`The most common word is '${mostCommonWord}' and it appears ${occurrence} times.`);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

 
fetchData();
