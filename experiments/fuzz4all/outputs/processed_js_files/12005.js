 

 
const fetchData = url => new Promise((resolve, reject) => {
  setTimeout(() => {
    const data = { message: 'Hello, world!', source: url };
    Math.random() > 0.2 ? resolve(data) : reject(new Error('Fetch error'));
  }, 1000);
});

 
const processData = async (url) => {
  try {
     
    const { message, source } = await fetchData(url);
    
     
    print(`Data received from ${source}:`, ...message.split(' '));
    
     
    const dataArray = [...message].map((char, index) => ({ index, char }));
    
     
    const vowelsCount = dataArray
      .filter(({ char }) => 'aeiou'.includes(char.toLowerCase()))
      .reduce((acc, { char }) => acc + (char.toLowerCase() === 'o' ? 2 : 1), 0);

    print(`Total vowel weight (with 'o' counted as double): ${vowelsCount}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

 
processData('https://example.com/api/data');
