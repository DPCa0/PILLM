 
async function* fetchStarWarsPeople(page = 1) {
  const url = `https: 
  try {
    const response = await fetch(url);
    const data = await response.json();

    for (const person of data.results) {
      yield person;
    }
    if (data.next) {
      yield* fetchStarWarsPeople(page + 1);
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

 
const handler = {
  get: function(target, prop) {
    if (typeof target[prop] === 'function') {
      return (...args) => {
        print(`Calling method '${prop}' with arguments:`, args);
        return target[prop](...args);
      };
    }
    return target[prop];
  }
};

 
const proxiedConsole = new Proxy(console, handler);

 
(async () => {
  let count = 0;
  for await (const { name, height, mass } of fetchStarWarsPeople()) {
    proxiedConsole.log(`Name: ${name}, Height: ${height}, Mass: ${mass}`);
    count++;
    if (count >= 10) break;  
  }
})();
