 
const randomDelay = (message, delay) => new Promise((resolve) => {
  setTimeout(() => resolve(message), delay);
});

 
(async () => {
   
  const promises = Array.from({ length: 5 }, (_, i) =>
    randomDelay(`Task ${i + 1} completed`, Math.random() * 2000)
  );

   
  const results = await Promise.allSettled(promises);

   
  const successfulResults = results
    .filter(({ status }) => status === 'fulfilled')
    .map(({ value }) => value);

   
  print(`Successful results:\n- ${successfulResults.join('\n- ')}`);
})();
