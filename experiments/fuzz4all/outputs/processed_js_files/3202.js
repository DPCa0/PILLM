class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

const fetchData = async () => {
    return new Promise((resolve) => setTimeout(() => resolve('Fetched Data'), 1000));
};

const processData = async (data) => {
    return new Promise((resolve) => setTimeout(() => resolve(`Processed ${data}`), 1000));
};

const execute = async () => {
    const deferred = new Deferred();

    async function* asyncGenerator() {
        print('Starting data fetch');
        const data = await fetchData();
        yield deferred.resolve(data);
        
        print('Data fetched, yielding processed data');
        const processed = await processData(data);
        yield processed;
    }

    const generator = asyncGenerator();
    
    generator.next().then(({ value }) => {
        print('First yield:', value);
        generator.next().then(({ value }) => print('Second yield:', value));
    });

    print('Code execution continues while async operations proceed');
};

execute();
