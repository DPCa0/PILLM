 
async function getJoke() {
  try {
     
    const response = await fetch('https://api.jokes.one/jod?category=animal');
    const data = await response.json();
    
     
    const {
      contents: {
        jokes: [
          {
            joke: { text: jokeText }
          }
        ]
      }
    } = data;

     
    print(`Here's a random animal joke for you:\n${jokeText}`);
  } catch (error) {
    console.error('Failed to fetch joke:', error);
  }
}

// Create an immediately invoked function expression (IIFE) to run the code
(async () => {
  // Use the new URL and URLSearchParams features to manipulate URLs
  const url = new URL('https: 
  url.searchParams.set('topic', 'jokes');
  print('Fetching from:', url.toString());

   
  const userPreference = null;  
  const selectedTopic = userPreference?.topic ?? 'default';
  print(`Selected topic: ${selectedTopic}`);

   
  await getJoke();
})();
