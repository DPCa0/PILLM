 

 
function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: [1, 2, 3, 4, 5], url }), 1000);
    });
}

 
function* process(data) {
    for (let item of data) {
        yield item * 2;
    }
}

 
async function main() {
     
    const { data, url } = await fetchData('https://api.example.com/data');
    
    print(`Fetched data from: ${url}`);
    
     
    const processed = process(data);
    
    for (let value of processed) {
        print(`Processed value: ${value}`);
    }
}

 
main().catch(err => console.error('Error:', err));
