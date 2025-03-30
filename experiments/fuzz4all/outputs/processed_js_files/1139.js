 

 
async function fetchData(url) {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) {
                resolve({ data: { id: 1, name: 'Advanced JavaScript' } });
            } else {
                reject('Fetch error');
            }
        }, 1000);
    });
}

 
function* asyncGenerator(urls) {
    for (const url of urls) {
        try {
            const { data } = yield fetchData(url);
            print(`Fetched: ${data.name} with ID: ${data.id}`);
        } catch (error) {
            console.error(error);
        }
    }
}

 
async function handleAsyncGenerator(generator) {
    const gen = generator();

    async function step(nextFn) {
        let result;
        try {
            result = await nextFn();
        } catch (error) {
            return console.error('Error in step: ', error);
        }
        if (!result.done) {
            step(() => result.value.then(value => gen.next(value)));
        }
    }

    step(() => Promise.resolve(gen.next()));
}

 
const urlMap = new Map([
    [1, 'https://api.example.com/resource/1'],
    [2, 'https://api.example.com/resource/2'],
]);

 
const urls = [...urlMap.values()];

 
handleAsyncGenerator(() => asyncGenerator(urls));
