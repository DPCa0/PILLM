 
function* numberGenerator() {
    let number = 1;
    while (true) {
        yield number++;
    }
}

async function fetchRandomFact() {
    const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    const data = await response.json();
    return data.text;
}

function getRandomFactPromise() {
    return new Promise(async (resolve, reject) => {
        try {
            const fact = await fetchRandomFact();
            resolve(fact);
        } catch (error) {
            reject("Failed to fetch a random fact.");
        }
    });
}

(async () => {
     
    const gen = numberGenerator();
    
     
    for (let i = 0; i < 5; i++) {
        print(`Fact ${gen.next().value}:`);
        try {
            const fact = await getRandomFactPromise();
            print(fact);
        } catch (error) {
            console.error(error);
        }
    }
})();
