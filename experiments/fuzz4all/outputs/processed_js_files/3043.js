 
const fs = require('fs').promises;
const { promisify } = require('util');
const setTimeoutPromise = promisify(setTimeout);

 
(async () => {
     
    const map = new Map([
        ['greeting', 'Hello, world!'],
        ['farewell', 'Goodbye, world!']
    ]);

     
    const set = new Set(['async', 'await', 'promises', 'async']);
    
     
    const [firstWord, ...restWords] = map.get('greeting').split(' ');
    
     
    const handler = {
        get: (target, prop) => (prop in target ? target[prop] : `Property ${prop} not found`)
    };
    const proxy = new Proxy({ firstWord, restWords, set }, handler);

     
    try {
        await fs.writeFile('example.txt', JSON.stringify(proxy));
        print('File written successfully');
        
         
        await setTimeoutPromise(2000);
        
        const data = await fs.readFile('example.txt', 'utf8');
        print('File read successfully:', data);
    } catch (error) {
        console.error('Error:', error);
    }

     
    function* wordGenerator(sentence) {
        for (let word of sentence.split(' ')) {
            yield word;
        }
    }

    const generator = wordGenerator(proxy.restWords.join(' '));
    let result = generator.next();
    while (!result.done) {
        print(result.value);
        result = generator.next();
    }
})();
