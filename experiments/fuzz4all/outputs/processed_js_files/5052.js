 
async function* fetchData() {
  const dataChunks = ["Hello", " ", "advanced", " ", "world", "!"];
  for (const chunk of dataChunks) {
     
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
    yield chunk;
  }
}

 
function processData(dataGenerator) {
  const handler = {
    get: (target, prop) => {
      if (prop in target) {
        return target[prop];
      }
      return () => "Unknown operation";
    }
  };
  const operations = new Proxy({
    async concatenate() {
      let message = "";
      for await (const chunk of dataGenerator) {
        message += chunk;
      }
      return message;
    },
  }, handler);

  return operations;
}

 
const displayMessage = async () => {
  const generator = fetchData();
  const { concatenate } = processData(generator);
  const message = await concatenate();
  print(...message.split(''));
};

displayMessage();
