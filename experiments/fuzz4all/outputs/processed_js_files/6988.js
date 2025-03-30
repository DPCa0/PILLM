 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({ data: [1, 2, 3, 4, 5] });
            } else {
                reject(new Error('Invalid URL'));
            }
        }, 1000);
    });
}

 
async function processData(url) {
    try {
        let result = await fetchData(url);
        print('Data fetched:', result.data);

         
        const privateProperty = Symbol('private');
        const dataObject = {
            public: result.data,
            [privateProperty]: 'Secret Data'
        };

         
        const handler = {
            get: (target, prop) => {
                if (prop === 'secret') {
                    return 'Access Denied';
                }
                return target[prop];
            }
        };

        const proxy = new Proxy(dataObject, handler);
        print('Public data:', proxy.public);
        print('Private data (attempt):', proxy.secret);
        print('Actual private data:', proxy[privateProperty]);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

processData('https://api.example.com/data');
