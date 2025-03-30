 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Alice', score: 85 },
                { id: 2, name: 'Bob', score: 92 },
                { id: 3, name: 'Charlie', score: 88 }
            ]);
        }, 1000);
    });
};

 
(async () => {
    try {
        const data = await fetchData();
        
         
        const dataHandler = {
            get: (target, property) => {
                print(`Accessing property: ${property}`);
                return target[property];
            }
        };
        
        const proxyData = data.map((item) => new Proxy(item, dataHandler));
        
         
        function* processScores(data) {
            for (let student of data) {
                yield `${student.name} has a score of ${student.score}`;
            }
        }
        
         
        for (let message of processScores(proxyData)) {
            print(message);
        }

    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
})();
