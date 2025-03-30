class DataFetcher {
    static async fetchData(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    }
}

class ComputationWorker {
    constructor() {
        this.worker = new Worker(URL.createObjectURL(new Blob([`
            self.onmessage = function(event) {
                const { type, payload } = event.data;
                switch(type) {
                    case 'compute':
                        const result = self.performComplexComputation(payload);
                        postMessage({ type: 'result', payload: result });
                        break;
                }
            };
            self.performComplexComputation = function(data) {
                 
                return data.map(x => x * x).reduce((a, b) => a + b, 0);
            };
        `])));
    }

    compute(data) {
        return new Promise((resolve) => {
            this.worker.onmessage = function(event) {
                const { type, payload } = event.data;
                if (type === 'result') {
                    resolve(payload);
                }
            };
            this.worker.postMessage({ type: 'compute', payload: data });
        });
    }
}

(async function main() {
    try {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const data = await DataFetcher.fetchData(url);
        const ids = data.map(post => post.id);
        
        const worker = new ComputationWorker();
        const result = await worker.compute(ids);
        
        print('Result of computation:', result);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
