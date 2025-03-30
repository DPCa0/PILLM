 
async function fetchDataAndProcess() {
    const url = 'https://jsonplaceholder.typicode.com/posts';

    try {
         
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

         
        let data = await response.json();

         
        let processedData = data
            .filter(post => post.userId === 1)
            .map(post => ({ ...post, title: post.title.toUpperCase() }))
            .sort((a, b) => a.title.localeCompare(b.title));

         
        let userIdSet = new Set(processedData.map(post => post.userId));

         
        let userMetadata = new WeakMap();
        for (let userId of userIdSet) {
            userMetadata.set({ id: userId }, { fetchedAt: new Date() });
        }

         
        print('Processed Data:', processedData);
        for (let userIdObj of userMetadata.keys()) {
            print('User Metadata:', userMetadata.get(userIdObj));
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
fetchDataAndProcess();

 
const originalObject = { a: 1, b: 2 };
const proxyHandler = {
    get(target, prop) {
        print(`Accessing property '${prop}'`);
        return target[prop];
    }
};
const proxiedObject = new Proxy(originalObject, proxyHandler);

 
print(proxiedObject.a);
print(proxiedObject.b);
