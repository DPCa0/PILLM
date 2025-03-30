 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function getJoke() {
     
    await delay(500);
    const jokes = [
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "Why don't scientists trust atoms? Because they make up everything!"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
}

 
const jokeHandler = {
    async get(target, prop) {
        if (prop in target) {
            print(`Fetching joke ${prop}...`);
            await delay(300);  
            return target[prop];
        }
        throw new Error(`No joke found at index ${prop}`);
    }
};

 
async function showJokes() {
     
    const jokesList = [
        await getJoke(),
        await getJoke(),
        await getJoke()
    ];

     
    const jokesProxy = new Proxy(jokesList, jokeHandler);

     
    try {
        print(await jokesProxy[0]);  
        print(await jokesProxy[1]);  
        print(await jokesProxy[2]);  
    } catch (error) {
        console.error(error.message);
    }
}

 
showJokes();
