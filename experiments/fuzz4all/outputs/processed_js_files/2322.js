 
const fetchRandomJoke = async () => {
  try {
     
    const response = await fetch('https://api.icndb.com/jokes/random');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    return data.value.joke;
  } catch (error) {
    console.error('Failed to fetch joke:', error);
  }
};

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
(async () => {
  const jokes = [];

   
  const results = await Promise.allSettled([
    fetchRandomJoke(),
    fetchRandomJoke(),
    fetchRandomJoke()
  ]);

   
  for (const result of results) {
    if (result.status === 'fulfilled') {
      jokes.push(result.value);
    } else {
      console.warn('One joke failed to fetch:', result.reason);
    }
  }

   
  const uniqueJokes = new Set(jokes);

  print('Fetched Unique Jokes:');
  uniqueJokes.forEach(joke => print(joke));

   
  await delay(3000);
  print('Hope you enjoyed the jokes!');
})();
