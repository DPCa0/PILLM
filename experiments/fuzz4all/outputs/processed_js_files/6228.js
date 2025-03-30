 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';

    const [firstPost, secondPost] = await fetchData(url);

     
    function* objectEntries(obj) {
        for (let key of Object.keys(obj)) {
            yield [key, obj[key]];
        }
    }

     
    const handler = {
        get(target, prop) {
            if (prop in target) {
                print(`Getting ${prop}`);
                return target[prop];
            } else {
                print(`${prop} not found`);
                return undefined;
            }
        }
    };

    const proxyPost = new Proxy(firstPost, handler);

     
    print('First Post ID:', proxyPost.id ?? 'No ID');
    print('Non-Existent Property:', proxyPost.nonExistentProp?.name ?? 'Not available');

     
    const titleLengths = new Map([
        ['First Post Title Length', firstPost.title.length],
        ['Second Post Title Length', secondPost.title.length]
    ]);

     
    print('\nFirst Post Entries:');
    for (let [key, value] of objectEntries(firstPost)) {
        print(`${key}: ${value}`);
    }

    print('\nTitle Lengths:');
    for (let [desc, length] of titleLengths.entries()) {
        print(`${desc}: ${length}`);
    }

     
    const postDetails = await Promise.allSettled([fetchData(url + '/1'), fetchData(url + '/2')]);

    postDetails.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`Post ${index + 1} fetched successfully:`,