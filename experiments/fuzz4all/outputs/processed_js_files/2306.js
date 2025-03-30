class Logger {
  static log(message) {
    print(`[${new Date().toISOString()}] ${message}`);
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* numberGenerator(max) {
  for (let i = 1; i <= max; i++) {
    await delay(500);
    yield i;
  }
}

function fetchUserData(id) {
  return new Proxy({}, {
    get(target, prop) {
      Logger.log(`Fetching property "${prop}" for user ${id}`);
      return `SampleDataForUser${id}`;
    }
  });
}

(async () => {
  const numbers = numberGenerator(3);
  for await (const num of numbers) {
    Logger.log(`Generated number: ${num}`);
    
    const user = fetchUserData(num);
    Logger.log(user.name);
    Logger.log(user.email);
  }
})();
