 
const readline = require('readline');

 
(async function() {
   
  const uniqueMessages = new Set(["Hello", "Hola", "Bonjour"]);
  const messageCount = new Map();

   
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function getUserInput(prompt) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    return new Promise((resolve) => rl.question(prompt, ans => {
      rl.close();
      resolve(ans);
    }));
  }

   
  for (const message of uniqueMessages) {
    messageCount.set(message, 0);
    print(`Message added: ${message}`);
  }
  
  const { size } = uniqueMessages;
  print(`Currently, there are ${size} unique messages stored.`);

   
  let continueProgram = true;
  while (continueProgram) {
    await delay(500);  
    const userMessage = await getUserInput('Enter a message (or type "exit" to quit): ');

     
    messageCount.set(userMessage, (messageCount.get(userMessage) ?? 0) + 1);

    if (userMessage === "exit") {
      continueProgram = false;
    } else {
      print(`You've entered "${userMessage}" ${messageCount.get(userMessage)} time(s).`);
    }
  }

   
  function tag(strings, ...values) {
    return strings.raw.reduce((prev, curr, i) => prev + curr + (values[i] || ""), "");
  }

  print(tag`Program has ended. Thanks for using our service!`);
})();
