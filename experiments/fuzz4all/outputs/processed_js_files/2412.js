 

 
import { promises as fs } from 'fs';

 

 
async function fetchJoke() {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();
    return data.value;
}

 
async function writeJokeToFile() {
    try {
        const joke = await fetchJoke();
        await fs.writeFile('joke.txt', joke);
        print('Joke written to file.');
    } catch (error) {
        console.error('Error writing joke to file:', error);
    }
}

 
const jokeHandler = {
    get: function(target, prop) {
        if (prop === 'text') {
            print('Accessing joke text.');
        }
        return target[prop];
    },
    set: function(target, prop, value) {
        if (prop === 'text') {
            print('Modifying joke text.');
        }
        target[prop] = value;
        return true;
    }
};

 
let jokeRef;
const registry = new FinalizationRegistry(heldValue => {
    print(`Cleaned up: ${heldValue}`);
});

async function run() {
    await writeJokeToFile();
    let joke = { text: 'Why don’t scientists trust atoms? Because they make up everything!' };
    const proxyJoke = new Proxy(joke, jokeHandler);
    print(proxyJoke.text);

     
    jokeRef = new WeakRef(proxyJoke);
    registry.register(proxyJoke, 'Joke Reference');

    proxyJoke.text = 'Updated joke text!';   
    print(jokeRef.deref()?.text);

    joke = null;   
    global.gc();   
}

 
run();
