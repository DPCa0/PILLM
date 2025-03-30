 

 
async function fetchConfig() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ theme: 'dark', lang: 'en', showNotifications: true });
    }, 1000);
  });
}

 
function* logGenerator() {
  yield 'Fetching configuration...';
  yield 'Configuration fetched successfully!';
  yield 'All operations completed!';
}

const logger = logGenerator();
print(logger.next().value);

 
(async () => {
   
  const config = await fetchConfig();
  print(logger.next().value);

   
  const handler = {
    set(target, property, value) {
      print(`Setting '${property}' to '${value}'`);
      return Reflect.set(target, property, value);
    }
  };

   
  const proxyConfig = new Proxy(config, handler);

   
  proxyConfig.theme = 'light';
  proxyConfig.lang = 'fr';

  print('Current Configuration:', proxyConfig);

  print(logger.next().value);
})();
