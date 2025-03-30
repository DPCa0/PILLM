 
(async () => {
  const { promises: fs } = await import('fs');

   
  const logHandler = {
    get: (target, prop) => {
      print(`Accessed property: ${prop}`);
      return prop in target ? target[prop] : undefined;
    }
  };

  const data = { message: "Hello, Proxy!" };
  const proxyData = new Proxy(data, logHandler);

   
  async function writeAndReadFile() {
    try {
      await fs.writeFile('message.txt', proxyData.message);
      const fileContent = await fs.readFile('message.txt', 'utf-8');

      print(fileContent);
    } catch (err) {
      console.error('Error:', err);
    }
  }

   
  const messageMap = new Map([
    [1, "Welcome to advanced JavaScript!"],
    [2, "Using Maps, Proxies, and Promises"]
  ]);

  print(`Message 1: ${messageMap.get(1)}`);

  writeAndReadFile();

   
  function* messageGenerator() {
    yield 'First message from generator';
    yield 'Second message from generator';
  }

  const gen = messageGenerator();
  for (const msg of gen) {
    print(msg);
  }
})();
