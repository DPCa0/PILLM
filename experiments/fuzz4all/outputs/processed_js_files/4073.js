 

 
async function fetchJoke() {
  try {
    const response = await fetch('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json' }
    });
    const jokeData = await response.json();
    return jokeData.joke;
  } catch (error) {
    console.error("Failed to fetch a joke", error);
  }
}

 
const handler = {
  get: function(target, property) {
    if (property in target) {
      return target[property];
    } else {
      return `No such property as "${property}" in the target object.`;
    }
  }
};

 
const jokeFetcher = {
  [Symbol('fetchJoke')]: fetchJoke
};

 
const proxy = new Proxy(jokeFetcher, handler);

 
(async function() {
  const jokeSymbol = Object.getOwnPropertySymbols(proxy)[0];
  const joke = await proxy[jokeSymbol]();
  print("Random Joke:", joke);
  
   
  print(proxy.nonExistentProp);
})();
