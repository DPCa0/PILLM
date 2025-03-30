 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const withRetry = (fn, retries = 3) => async (...args) => {
  let attempts = 0;
  while (attempts < retries) {
    try {
      return await fn(...args);
    } catch (error) {
      if (attempts === retries - 1) throw error;
      attempts++;
      print(`Retrying... (${attempts})`);
    }
  }
};

 
const unreliableNetworkRequest = async () => {
  const success = Math.random() > 0.7;
  await delay(500);  
  if (!success) throw new Error('Network error');
  return 'Data received';
};

 
function* generateNumbers() {
  let number = 1;
  while (true) {
    yield number++;
  }
}

 
const main = async () => {
  const networkRequest = withRetry(unreliableNetworkRequest, 5);

  for await (const num of generateNumbers()) {
    print(`Attempt ${num}:`);
    try {
      const data = await networkRequest();
      print(`Success: ${data}`);
      break;  
    } catch (error) {
      console.error(`Failed: ${error.message}`);
    }
    if (num >= 10) {
      print("Max attempts reached, exiting...");
      break;
    }
  }
};

 
main();
