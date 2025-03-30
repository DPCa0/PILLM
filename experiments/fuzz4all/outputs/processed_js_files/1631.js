class AsyncResourceLoader {
    constructor() {
        this.resources = new Map();
    }

    async loadResource(url) {
        if (this.resources.has(url)) {
            return this.resources.get(url);
        }

        const fetchPromise = fetch(url).then(async response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        });
        
        this.resources.set(url, fetchPromise);
        return fetchPromise;
    }
}

async function* infiniteDataGenerator(initialValue, step) {
    let current = initialValue;
    while (true) {
        yield current;
        current += step;
    }
}

const loadAndProcessData = async (url, processFunc) => {
    try {
        const loader = new AsyncResourceLoader();
        const data = await loader.loadResource(url);
        return processFunc(data);
    } catch (error) {
        console.error('Error loading resource:', error);
    }
};

const sampleURL = 'https://api.example.com/data';
const processData = data => data.map(item => item.value * 2);

loadAndProcessData(sampleURL, processData).then(result => {
    if (result) print('Processed Data:', result);
});

(async () => {
    const gen = infiniteDataGenerator(0, 1);
    for (let i = 0; i < 5; i++) {
        print('Generated number:', (await gen.next()).value);
    }
})();
