 
import { promises as fsPromises } from 'fs';

 
(async function advancedJavaScriptDemo() {
    try {
         
        const { default: axios } = await import('https://cdn.skypack.dev/axios@0.21.1');
        
         
        const { data: joke } = await axios.get('https://official-joke-api.appspot.com/random_joke');
        
         
        const { setup, punchline } = joke;
        
         
        const jokeText = `Here's a joke for you: ${setup} - ${punchline}`;
        
        // Use the fsPromises API with async/await to write the joke to a file
        await fsPromises.writeFile('joke.txt', jokeText);
        
        // Use Symbol to create a unique identifier
        const uniqueID = Symbol('UniqueID');
        
        // Log the results using various console methods and the unique identifier
        print('Joke fetched and saved successfully!', uniqueID.description);
        console.info(`Joke content: ${jokeText}`);
        console.warn('This is a demo with modern JavaScript features.');
        
        // Use setTimeout with Promises to simulate a delay using Promise.race and Promise.resolve
        await Promise.race([
            new Promise(resolve => setTimeout(resolve, 2000)),
            Promise.resolve('Fast resolution')
        ]);

        // Demonstrate using a Map and optional chaining
        const map = new Map();
        map.set(uniqueID, jokeText);

        print(`Retrieved from map: ${map.get(uniqueID)?.toUpperCase()}`);

    } catch (error) {
        // Use optional chaining and nullish coalescing for error logging
        console.error(`An error occurred: ${error?.message ?? 'Unknown error'}`);
    }
})();
