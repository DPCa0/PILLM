 
const delayedMessage = (msg, maxDelay = 2000) => {
  return new Promise(resolve => {
    const delay = Math.random() * maxDelay;
    setTimeout(() => resolve(msg), delay);
  });
};

 
(async () => {
   
  const messages = ['Hello', 'from', 'the', 'async', 'world!'];

   
  const messagePromises = messages.map((msg, index) => delayedMessage(`${index + 1}: ${msg}`));

   
  const results = await Promise.all(messagePromises);
  
   
  const [first, second, ...rest] = results;
  print(`First: ${first}, Second: ${second}, Rest: ${rest.join(', ')}`);
})();
