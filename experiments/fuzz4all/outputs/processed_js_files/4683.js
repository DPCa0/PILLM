 

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}

async function* dataGenerator(urls) {
    for (const url of urls) {
        yield fetchData(url);
    }
}

const processData = async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];

    try {
        const dataPromises = [];
        const generator = dataGenerator(urls);

        for await (let promise of generator) {
            dataPromises.push(promise);
        }

        const results = await Promise.all(dataPromises);
        
        for (const { id, title, body } of results) {
            print(`Post ID: ${id}\nTitle: ${title}\nBody: ${body}\n`);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

processData();
