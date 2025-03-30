 

 
async function fetchRandomJoke() {
  const response = await fetch('https://official-joke-api.appspot.com/random_joke');
  if (!response.ok) throw new Error('Network response was not ok');
  const joke = await response.json();
  return `${joke.setup} - ${joke.punchline}`;
}

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const createLoggerProxy = obj => new Proxy(obj, {
  get(target, prop) {
    print(`Property "${prop}" has been accessed`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Property "${prop}" has been set to "${value}"`);
    target[prop] = value;
    return true;
  }
});

 
const userSettings = createLoggerProxy({ theme: 'dark', notifications: true });

 
(async () => {
  try {
    print('Fetching a random joke...');
    const joke = await fetchRandomJoke();
    print(`Joke received: ${joke}`);
    
    print('Simulating some delay...');
    await delay(2000);

    print('Modifying user settings through proxy...');
    userSettings.theme = 'light';
    print(`Current theme: ${userSettings.theme}`);
    
  } catch (error) {
    console.error('Error:', error);
  }
})();
