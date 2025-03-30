 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { name: 'Alice', score: 85 },
                { name: 'Bob', score: 92 },
                { name: 'Charlie', score: 87 },
                { name: 'David', score: 95 }
            ]);
        }, 1000);
    });
}

 
async function processScores() {
    const data = await fetchData();
    
     
    const scoresSet = new Set(data.map(({ score }) => score));
    
     
    const handler = {
        get: (target, prop) => {
            if (prop === 'highest') {
                return Math.max(...target);
            }
            if (prop === 'lowest') {
                return Math.min(...target);
            }
            return target[prop];
        }
    };
    
    const scoresProxy = new Proxy([...scoresSet], handler);
    
     
    const names = data.map(({ name }) => name);
    
    print('Unique Scores:', scoresProxy);
    print('Highest Score:', scoresProxy.highest);
    print('Lowest Score:', scoresProxy.lowest);
    print('Participants:', names.join(', '));
}

processScores().catch(console.error);
