 
import { promises as fs } from 'fs';

 
(async () => {
   
  try {
     
    const configData = await fs.readFile('config.json', 'utf8');
    const config = JSON.parse(configData);

     
    const { greeting = "Hello", target = "world" } = config;

     
    class Greeter {
      #greeting;
      #target;

      constructor(greeting, target) {
        this.#greeting = greeting;
        this.#target = target;
      }

       
      #formatMessage() {
        return `${this.#greeting}, ${this.#target}!`;
      }

       
      greet() {
        print(this.#formatMessage());
      }
    }

     
    const customMessage = config?.customMessage ?? `${greeting}, ${target}!`;

     
    const useCustom = config.useCustomMessage ? customMessage : new Greeter(greeting, target).greet();

    print(useCustom);

     
    const emphasize = (strs, ...exprs) => {
      return strs.reduce((prev, curr, i) => `${prev}${curr.toUpperCase()}${exprs[i] ? exprs[i] : ''}`, '');
    };
    print(emphasize`Current config loaded. Message is: ${customMessage}`);

  } catch (error) {
    console.error('Error:', error);
  }

   
  const tasks = [
    fs.writeFile('log1.txt', 'Logging some information...'),
    fs.writeFile('log2.txt', 'Logging additional data...')
  ];

  const results = await Promise.allSettled(tasks);
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      print('Task completed:', result.value);
    } else {
      console.error('Task failed:', result.reason);
    }
  });

})();
