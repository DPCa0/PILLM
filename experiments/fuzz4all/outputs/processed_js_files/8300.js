 
const randomDelay = () => new Promise(resolve => {
  const delay = Math.floor(Math.random() * 5000);
  setTimeout(() => resolve(delay), delay);
});

 
async function asyncProcess() {
  try {
    print("Process started...");
    
     
    const results = await Promise.all(
      Array.from({ length: 5 }, async (_, index) => {
        const delay = await randomDelay();
        print(`Task ${index + 1} finished after ${delay}ms`);
        return delay;
      })
    );

     
    const uniqueResults = new Set(results);

     
    const [longest, ...rest] = [...uniqueResults].sort((a, b) => b - a);
    print(`Longest delay: ${longest}ms, Others: ${rest}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

 
(function immediateExecution() {
  let counter = 0;

   
  const incrementCounter = () => {
    counter++;
    print(`Counter: ${counter}`);
  };

   
  setInterval(incrementCounter, 1000);
})();

 
asyncProcess();
