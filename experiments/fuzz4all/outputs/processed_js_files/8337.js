class NetworkRequest {
    constructor(url, method = 'GET') {
        this.url = url;
        this.method = method;
    }

    async fetchData() {
        try {
            const response = await fetch(this.url, { method: this.method });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

const processData = (data) => {
    const mappedData = data.map(({ id, name }) => ({ id, name }));
    const filteredData = mappedData.filter(item => item.id % 2 === 0);
    return new Map(filteredData.map(item => [item.id, item.name]));
}

(async () => {
    const request = new NetworkRequest('https://jsonplaceholder.typicode.com/users');
    const data = await request.fetchData();

    if (data) {
        const processedData = processData(data);
        
        for (const [id, name] of processedData.entries()) {
            print(`ID: ${id}, Name: ${name}`);
        }
    }
})();

 
 
 
 
 
 
