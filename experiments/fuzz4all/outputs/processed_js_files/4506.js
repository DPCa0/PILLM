 
const fs = require('fs').promises;

 
(async function advancedFeaturesDemo() {
  try {
     
    const { default: config } = await import('./config.json', {
      assert: { type: 'json' }
    });
    
     
    const settings = config?.settings ?? { theme: 'default', language: 'en' };

     
    function styledLog(strings, ...values) {
      const styledStrings = strings.map((str, i) =>
        `%c${str}${values[i] ? `%c${values[i]}` : ''}`
      );
      print(styledStrings.join(''), 'color: blue;', 'color: green;');
    }

    styledLog`Loading settings: ${JSON.stringify(settings)}`;

     
    const filePaths = ['./file1.txt', './file2.txt', './file3.txt'];
    const fileOperations = filePaths.map((path) => fs.readFile(path, 'utf8'));

    const results = await Promise.allSettled(fileOperations);

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        print(`File ${filePaths[index]} content:`, result.value);
      } else {
        console.error(`Failed to read ${filePaths[index]}:`, result.reason);
      }
    });

     
    const handler = {
      get(target, prop) {
        print(`Accessing property "${prop}"`);
        return Reflect.get(...arguments);
      }
    };

    const proxySettings = new Proxy(settings, handler);
    print('Theme:', proxySettings.theme);
    print('Language:', proxySettings.language);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
