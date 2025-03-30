class DataFetcher {
    static async fetchData(url) {
        try {
            let response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            let data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetching error:', error);
            return null;
        }
    }
}

function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const dataUrl = 'https://jsonplaceholder.typicode.com/posts';
    const gen = idGenerator();
    
    const parallelFetch = async () => {
        const id1 = gen.next().value;
        const id2 = gen.next().value;
        print(`Fetching data for IDs ${id1} and ${id2}...`);

        const [data1, data2] = await Promise.all([
            DataFetcher.fetchData(`${dataUrl}/${id1}`),
            DataFetcher.fetchData(`${dataUrl}/${id2}`)
        ]);

        print('Data 1:', data1);
        print('Data 2:', data2);
    };

    for (let i = 0; i < 3; i++) {
        await parallelFetch();
        await delay(1000);
    }
})();
