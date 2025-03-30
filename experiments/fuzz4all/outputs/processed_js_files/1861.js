 

 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

 
function* dataGenerator(dataArray) {
    for (const data of dataArray) {
        yield data;
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessed property "${prop}" with value: ${target[prop]}`);
            return target[prop];
        } else {
            print(`Property "${prop}" does not exist.`);
            return null;
        }
    }
};

 
async function main() {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        const generator = dataGenerator(data);

         
        for (let i = 0; i < 3; i++) {
            let post = generator.next().value;
            if (post) {
                let proxiedPost = new Proxy(post, handler);
                print(`Post ID: ${proxiedPost.id}, Title: ${proxiedPost.title}`);
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();
