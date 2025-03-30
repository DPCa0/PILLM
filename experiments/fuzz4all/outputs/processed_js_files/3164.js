 

 
function fetchData(endpoint) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (endpoint === 'users') {
                resolve(['Alice', 'Bob', 'Charlie']);
            } else if (endpoint === 'posts') {
                resolve(['Post1', 'Post2', 'Post3']);
            } else {
                reject('Unknown endpoint');
            }
        }, 1000);
    });
}

 
function* dataGenerator(endpoints) {
    for (const endpoint of endpoints) {
        yield fetchData(endpoint);
    }
}

 
async function processData() {
    const endpoints = ['users', 'posts'];
    const generator = dataGenerator(endpoints);

    for (let promise of generator) {
        try {
            const data = await promise;
            print('Data received:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

 
processData();
