 

(async () => {
   
  const { randomUUID } = await import('crypto');

   
  const randomTimeoutPromise = (message) => {
    return new Promise((resolve) => {
      const timeout = Math.floor(Math.random() * 2000) + 1000;
      setTimeout(() => resolve(`${message} after ${timeout} ms`), timeout);
    });
  };

   
  async function main() {
    try {
      print("Starting sequence...");

       
      const result1 = await randomTimeoutPromise("Step 1 complete");
      print(result1);

      const result2 = await randomTimeoutPromise("Step 2 complete");
      print(result2);

      const result3 = await randomTimeoutPromise("Step 3 complete");
      print(result3);

       
      const uuid = randomUUID();
      print(`Generated UUID: ${uuid}`);

      print("Sequence complete!");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

   
  main();
})();
