(async () => {
     
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

     
    const fetchJoke = async () => {
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        if (!response.ok) throw new Error('Failed to fetch the joke');
        const joke = await response.json();
        return joke;
    };

     
    async function* jokeGenerator(count) {
        for (let i = 0; i < count; i++) {
            try {
                const joke = await fetchJoke();
                yield `${joke.setup} - ${joke.punchline}`;
                await delay(3000);  
            } catch (error) {
                yield `Error fetching joke: ${error.message}`;
                await delay(1000);
            }
        }
    }

     
    const consoleProxy = new Proxy(console, {
        get(target, property) {
            if (property === 'log') {
                return (...args) => target.log(`[LOG]: ${new Date().toISOString()}`, ...args);
            }
            return target[property];
        }
    });

     
    (async () => {
        consoleProxy.log('Fetching jokes...');

        const jokes = jokeGenerator(3);

        for await (const joke of jokes) {
            consoleProxy.log(joke);
        }

        consoleProxy.log('All jokes fetched.');
    })();
})();
