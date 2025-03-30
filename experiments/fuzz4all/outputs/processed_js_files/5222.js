 
async function getRandomJoke() {
    try {
        const response = await fetch('https://api.icndb.com/jokes/random?limitTo=[nerdy]');
        if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);

        const data = await response.json();
        print('Random Joke:', data.value.joke);
    } catch (error) {
        console.error('Failed to fetch a joke:', error);
    }
}

 
const jokeProxyHandler = {
    get(target, property, receiver) {
        print(`Getting ${property} from jokes`);
        return Reflect.get(...arguments);
    },
    set(target, property, value, receiver) {
        print(`Setting ${property} to ${value} in jokes`);
        return Reflect.set(...arguments);
    }
};

const jokes = new Proxy({}, jokeProxyHandler);

 
function* jokeGenerator() {
    yield 'Why do JavaScript developers wear glasses? Because they don\'t C#!';
    yield 'How do you comfort a JavaScript bug? You console it!';
    yield 'Why was the JavaScript developer sad? Because he didn\'t know how to "null" his feelings.';
}

 
const [joke1, ...restJokes] = [...jokeGenerator()];
jokes.firstJoke = joke1;

print('First Joke:', jokes.firstJoke);

 
getRandomJoke();

 
const checkAnotherJoke = (joke) => joke?.length ?? 'No joke available';
print('Checking another joke:', checkAnotherJoke(restJokes[0]));
