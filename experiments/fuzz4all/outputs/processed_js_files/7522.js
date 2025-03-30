 

 
const delayedMessage = (message, delay) => {
  return new Promise((resolve) => setTimeout(() => resolve(message), delay));
};

 
const logMessages = async () => {
  try {
    const messages = await Promise.all([
      delayedMessage("Loading data...", 1000),
      delayedMessage("Processing data...", 2000),
      delayedMessage("Finalizing...", 3000),
    ]);

    for (const msg of messages) {
      print(msg);
    }
    
    print("Operation completed successfully!");
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

 
(async () => {
  await logMessages();
})();
