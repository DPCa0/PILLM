 

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function* paginateData(data, pageSize) {
    for (let i = 0; i < data.length; i += pageSize) {
        yield data.slice(i, i + pageSize);
    }
}

async function processData(url, pageSize) {
    try {
        const data = await fetchData(url);
        const { title, items } = data;  
        print(`Data Title: ${title}`);

        const generator = paginateData(items, pageSize);
        let page = 1;
        for (let pageData of generator) {
            print(`Page ${page}:`, pageData);
            page++;
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

 
const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';
processData(apiEndpoint, 5);
