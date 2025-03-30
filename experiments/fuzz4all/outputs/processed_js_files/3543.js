class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

const fetchData = async (url) => {
    const deferred = new Deferred();
    try {
        setTimeout(() => {
            deferred.resolve(`Data from ${url}`);
        }, 2000);
        return await deferred.promise;
    } catch (error) {
        throw new Error('Fetch error: ' + error);
    }
};

const processData = async () => {
    const urls = ['https://api.example.com/1', 'https://api.example.com/2', 'https://api.example.com/3'];
    const results = await Promise.all(urls.map(url => fetchData(url)));
    
    const processedData = results.flatMap(data => {
        const parts = data.split(' ');
        return parts.map(part => part.toUpperCase());
    });

    const uniqueData = new Set(processedData);
    return Array.from(uniqueData).sort();
};

processData().then(data => {
    print('Processed data:', data);
}).catch(err => {
    console.error(err);
});
