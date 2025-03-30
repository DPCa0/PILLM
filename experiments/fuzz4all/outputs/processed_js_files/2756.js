 
(async () => {
   
  const { random } = await import('lodash');

   
  const waitForRandomTime = () => {
    return new Promise((resolve) => {
      const timeout = random(500, 2000);
      print(`Waiting for ${timeout} ms`);
      setTimeout(resolve, timeout);
    });
  };

   
  const logMessages = async () => {
    const messages = ["Hello", "This is", "An advanced", "JavaScript", "Program"];
    for (const [index, message] of messages.entries()) {
      await waitForRandomTime();
      print(`Message ${index + 1}: ${message}`);
    }
  };

   
  await logMessages();

  print("All messages have been logged.");
})();
