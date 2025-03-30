 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const fakeData = { name: 'Sample Data', url };
            if (Math.random() > 0.1) {
                resolve(fakeData);
            } else {
                reject('Data fetch failed!');
            }
        }, 1000);
    });
}

 
async function processData() {
    try {
        const data1 = await fetchData('https://api.example.com/data1');
        const data2 = await fetchData('https://api.example.com/data2');
        print('Data fetched:', data1, data2);

         
        const { name: name1, ...rest1 } = data1;
        const { name: name2, ...rest2 } = data2;

        const combined = { ...rest1, ...rest2, names: [name1, name2] };
        print('Combined Data:', combined);

         
        function formatMessage(strings, ...values) {
            return strings.raw.map((str, i) => `${str}${values[i] || ''}`).join('');
        }

        const message = formatMessage`Data Processed Successfully: Names: ${combined.names.join(', ')}`;
        print(message);
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

 
const handler = {
    get(target, propKey, receiver) {
        const origMethod = target[propKey];
        return function(...args) {
            print(`Called ${propKey} with arguments:`, args);
            return origMethod.apply(this, args);
        };
    }
};

 
const consoleProxy = new Proxy(console, handler);

 
consoleProxy.log('Starting data processing...');
processData();
consoleProxy.log('Data processing initiated...');
