const asyncOperation = () => new Promise(resolve => setTimeout(() => resolve(Math.random()), 1000));

const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
  try {
    const [value1, value2, value3] = await Promise.all([
      asyncOperation(),
      asyncOperation(),
      asyncOperation()
    ]);

    const logRandomValues = () => {
      print(`Value 1: ${value1}`);
      print(`Value 2: ${value2}`);
      print(`Value 3: ${value3}`);
    };

    const delay = Math.floor((value1 + value2 + value3) * 1000);
    
    if (value1 > 0.5) {
      print("Random value1 is greater than 0.5, delaying by:", delay);
      await timeout(delay);
      logRandomValues();
    } else {
      print("Random value1 is not greater than 0.5, skipping delay.");
      logRandomValues();
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main();
