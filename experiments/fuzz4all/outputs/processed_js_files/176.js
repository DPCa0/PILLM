 

async function fetchData(api) {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (api === 'valid') {
                resolve([
                    { id: 1, name: 'Alice', value: 10 },
                    { id: 2, name: 'Bob', value: 20 },
                    { id: 3, name: 'Charlie', value: 30 }
                ]);
            } else {
                reject('Invalid API');
            }
        }, 1000);
    });
}

async function processData() {
    try {
        const data = await fetchData('valid');  

         
        const transformedData = new Map();
        for (let { id, name, value } of data) {
            transformedData.set(id, { name, value });
        }

         
        const nameSet = new Set(data.map(({ name }) => name));

        print('Transformed Data:', transformedData);
        print('Unique Names:', nameSet);

         
        const [first, , third] = data;
        print('First Record:', first);
        print('Third Record:', third);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

processData();
