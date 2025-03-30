 
class SecretBox {
  #secretMessage;  

  constructor(message) {
    this.#secretMessage = message;
  }

   
  #transformMessage(callback) {
    return callback(this.#secretMessage);
  }

   
  async revealSecret(asyncCallback) {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.#transformMessage(asyncCallback));
      }, 1000);
    });
    return await promise;
  }
}

 
async function revealTheSecret() {
  const box = new SecretBox("The eagle flies at dawn.");
  
  try {
    const secret = await box.revealSecret(message => message.toUpperCase());
    print(`Revealed Secret: ${secret}`);
  } catch (error) {
    console.error("Failed to reveal the secret:", error);
  }
}

 
(async () => {
  print("Preparing to reveal the secret...");
  await revealTheSecret();
  print("Secret revelation complete.");
})();
