 
class Secret {
  #secretCode;
  constructor(code) {
    this.#secretCode = code;
  }

   
  #reveal() {
    return `The secret code is: ${this.#secretCode}`;
  }

  getSecret(reveal) {
    if (typeof reveal === 'function') {
      return reveal(this.#reveal.bind(this));
    }
    return "Access denied!";
  }
}

 
const handler = {
  get: function(target, prop) {
    if (prop.startsWith('get')) {
      return function() {
        print(`Accessing method: ${prop}`);
        return target[prop].apply(target, arguments);
      }
    }
    return undefined;
  }
};

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

 
(async () => {
   
  const mySecret = new Proxy(new Secret('12345'), handler);

   
  const result = mySecret.getSecret(fn => fn());
  print(result);  

  try {
     
    const data = await fetchData('https://api.chucknorris.io/jokes/random');
    print('Random Chuck Norris Joke:', data.value);
  } catch (error) {
    console.error('Fetching data failed:', error);
  }
})();
