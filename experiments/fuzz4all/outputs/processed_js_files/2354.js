 
async function* jokeGenerator() {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    if (response.ok) {
        const joke = await response.json();
        yield `${joke.setup} - ${joke.punchline}`;
    } else {
        yield "Failed to fetch joke.";
    }
}

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function computeFactorial(n) {
    return new Promise((resolve, reject) => {
        const workerCode = `
            self.onmessage = function(e) {
                const n = e.data;
                let result = 1;
                for (let i = 2; i <= n; i++) result *= i;
                postMessage(result);
                close();
            }
        `;
        const blob = new Blob([workerCode], { type: "application/javascript" });
        const worker = new Worker(URL.createObjectURL(blob));
        worker.onmessage = function(e) { resolve(e.data); };
        worker.onerror = function(err) { reject(err); };
        worker.postMessage(n);
    });
}

 
(async function main() {
    try {
         
        const [joke, factorial] = await Promise.all([
            (async () => {
                const jokeGen = jokeGenerator();
                const { value } = await jokeGen.next();
                return value;
            })(),
            computeFactorial(5)
        ]);

         
        print(`Random Joke: ${joke}`);
        print(`Factorial of 5 is: ${factorial}`);

         
        const additionalJoke = (await jokeGenerator().next())?.value ?? "No additional joke found.";
        print(`Another Joke: ${additionalJoke}`);

         
        await delay(2000);
        print("Completed execution after delay.");
    } catch (error) {
        console.error("Error occurred:", error);
    }
})();
