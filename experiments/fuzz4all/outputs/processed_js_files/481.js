 
async function fetchDataAndProcess() {
   
  const response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
  const commits = await response.json();

   
  const messages = commits.slice(0, 5).map(({ commit: { message } }) => message);

   
  const wordsSet = new Set();
  messages.forEach(message => {
    message.split(' ').forEach(word => wordsSet.add(word.toLowerCase()));
  });

   
  const uniqueWords = Array.from(wordsSet).sort();

   
  const proxyUniqueWords = new Proxy(uniqueWords, {
    get(target, prop) {
      if (prop in target) {
        print(`Accessing word at index ${prop}: ${target[prop]}`);
        return target[prop];
      }
      return undefined;
    }
  });

   
  proxyUniqueWords.forEach((word, index) => print(`Word ${index + 1}: ${word}`));
}

fetchDataAndProcess().catch(console.error);
