 
async function* fetchData() {
    const urls = [
        'https://api.chucknorris.io/jokes/random',
        'https://api.chucknorris.io/jokes/random',
        'https://api.chucknorris.io/jokes/random'
    ];

    for (const url of urls) {
        const response = await fetch(url);
        const data = await response.json();
        yield data.value;
    }
}

 
function mergeJokes(...jokeArrays) {
    return jokeArrays.reduce((acc, jokes) => [...acc, ...jokes], []);
}

 
(async () => {
    const allJokes = [];
    const generator = fetchData();

    for await (const joke of generator) {
        allJokes.push(joke);
    }

    print('Jokes fetched:', allJokes);

     
    const additionalJokes = ['Joke 1', 'Joke 2'];
    const combinedJokes = mergeJokes(allJokes, additionalJokes);

    print('Combined Jokes:', combinedJokes);
})();
