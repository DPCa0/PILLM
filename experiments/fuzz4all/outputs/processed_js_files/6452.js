 
async function fetchJoke() {
  try {
    let response = await fetch('https://official-joke-api.appspot.com/random_joke');
    if (!response.ok) throw new Error('Network response was not ok');
    let jokeData = await response.json();

     
    const { setup, punchline } = jokeData;

     
    print(`Here's a random joke for you: \n${setup} \n${punchline}`);
  } catch (error) {
    console.error('Fetching joke failed:', error);
  }
}

// Using Promise.all to demonstrate handling of multiple asynchronous operations
function fetchMultipleJokes(numberOfJokes) {
  const promises = Array.from({ length: numberOfJokes }, () => fetchJoke());
  Promise.all(promises).then(() => print('Finished fetching all jokes.'));
}

 
fetchMultipleJokes(3);
