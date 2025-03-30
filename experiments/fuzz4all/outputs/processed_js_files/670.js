 
class SecretKeeper {
  #secret;  

  constructor(secret) {
    this.#secret = secret;
  }

   
  #revealSecret() {
    return `The secret is: ${this.#secret}`;
  }

   
  getSecret(allowAccess) {
    return allowAccess?.() ?? "Access denied.";
  }

   
  static async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  }
}

 
(async () => {
  const keeper = new SecretKeeper("JavaScript is awesome!");

  const results = await Promise.allSettled([
    keeper.getSecret(() => keeper.#revealSecret()),
    SecretKeeper.fetchData('https://jsonplaceholder.typicode.com/todos/1'),
    new Promise((resolve, reject) => setTimeout(() => reject('Timeout error'), 1000))
  ]);

  results.forEach(({ status, value, reason }) => {
    const output = status === "fulfilled" ? value : reason;
    print(output);
  });
})();
