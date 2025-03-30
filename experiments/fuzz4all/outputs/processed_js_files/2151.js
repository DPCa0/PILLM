 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function fetchJoke() {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const joke = await response.json();
    print(`Here's a joke: ${joke.setup} - ${joke.punchline}`);
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const obj = new Proxy({ a: 1, b: 2 }, handler);

 
(async () => {
     
    obj.a = 3;
    print(obj.b);
    
     
    await fetchJoke();
    
     
    const fibGen = fibonacci();
    for (let i = 0; i < 5; i++) {
        await delay(1000);
        print(fibGen.next().value);
    }
})();
