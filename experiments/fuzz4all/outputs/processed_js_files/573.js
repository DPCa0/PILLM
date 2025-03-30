 

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function* asyncNumberGenerator() {
  for (let i = 1; i <= 5; i++) {
    await delay(1000);
    yield i;
  }
}

async function displayNumbers() {
  const generator = asyncNumberGenerator();

  for await (const num of generator) {
    print(`Number: ${num}`);
  }
}

const handler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      throw new Error(`Property ${prop} does not exist.`);
    }
  },
};

const secureData = {
  apiKey: '1234567890abcdef',
  secret: 's3cr3t',
};

const protectedData = new Proxy(secureData, handler);

function main() {
  print('Starting the async number display:');
  displayNumbers().then(() => {
    print('All numbers displayed.');

     
    try {
      print(`Accessing API Key: ${protectedData.apiKey}`);
      print(`Accessing Non-existent Property: ${protectedData.nonExistent}`);
    } catch (error) {
      console.error(error.message);
    }
  });
}

main();
