 
const fetchJoke = async () => {
  const response = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
  const jokes = await response.json();
  return jokes[0];
};

 
const heavyComputation = async (input) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(input.split('').reverse().join(''));
    }, 1000);
  });
};

 
async function* jokeGenerator(count) {
  for (let i = 0; i < count; i++) {
    yield await fetchJoke();
  }
}

 
(async () => {
  print('Fetching 3 programming jokes...');

   
  const jokes = jokeGenerator(3);
  for await (let joke of jokes) {
    print(`Q: ${joke.setup}`);
    print(`A: ${joke.punchline}`);
    
     
    const { setup, punchline } = joke;
    const [first, ...rest] = setup.split(' ');
    const newSetup = [first, ...rest.map(word => word.toUpperCase())].join(' ');

     
    const reversedPunchline = await heavyComputation(punchline);
    print(`Transformed Setup: ${newSetup}`);
    print(`Reversed Punchline: ${reversedPunchline}`);
    print('---');
  }
})();
