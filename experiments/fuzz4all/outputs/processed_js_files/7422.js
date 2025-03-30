 
async function processData(urls) {
     
    const fetchPromises = urls.map(async (url) => {
        try {
            let response = await fetch(url);  
            if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
            let data = await response.json();  
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    });

     
    let results = await Promise.all(fetchPromises);

     
    let [first, ...rest] = results.filter(Boolean);
    let mergedData = { ...first, ...rest.reduce((acc, curr) => ({ ...acc, ...curr }), {}) };

     
    let finalResult = mergedData?.finalKey ?? 'No final key present';
    print(finalResult);

     
    let uniqueItems = new Set(Object.values(mergedData));
    print('Unique Items:', [...uniqueItems]);
}

 
const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3'
];

 
processData(urls);
