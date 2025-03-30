 

 
const fetchJoke = async () => {
  try {
    let response = await fetch('https://official-joke-api.appspot.com/random_joke');
    if (!response.ok) throw new Error('Network response was not ok');
    let { setup, punchline } = await response.json();  
    return `${setup} - ${punchline}`;
  } catch (error) {
    return `Error fetching joke: ${error.message}`;
  }
};

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
(async () => {
  try {
    print('Fetching a joke for you...');
    await delay(2000);  
    let joke = await fetchJoke();
    print(joke);
  } catch (error) {
    console.error('Something went wrong:', error);
  }
})();
