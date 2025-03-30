 

class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

const processData = async ({ id, name, status }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status === 'active') {
                print(`Processing data for ${name} with ID: ${id}`);
                resolve(`Data processed for ${name}`);
            } else {
                reject(`Data not processed for ${name} because status is ${status}`);
            }
        }, 1000);
    });
};

(async () => {
    const apiURL = 'https://jsonplaceholder.typicode.com/users';
    const dataFetcher = new DataFetcher(apiURL);

    try {
        const data = await dataFetcher.fetchData();
        if (data) {
            const processResults = await Promise.all(data.map(user => 
                processData(user).catch(err => err)
            ));
            processResults.forEach(result => print(result));
        }
    } catch (error) {
        console.error('Error in data processing:', error);
    }
})();
