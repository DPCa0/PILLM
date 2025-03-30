 

const fetchData = (url) => {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({ id: 1, name: 'John Doe', age: 30 });
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
};

function* dataProcessor(data) {
     
    for (const [key, value] of Object.entries(data)) {
        yield `${key.toUpperCase()}: ${value}`;
    }
}

async function fetchAndProcessData(url) {
    try {
         
        const data = await fetchData(url);

         
        const { id, name, age } = data;
        
        print('Fetched Data:');
        print(`ID: ${id}, Name: ${name}, Age: ${age}`);

        const processedData = dataProcessor(data);
        print('\nProcessed Data:');
        for (const entry of processedData) {
            print(entry);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

fetchAndProcessData('https://api.example.com/data');
