 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error: ', error);
        throw error;
    }
}

 
const handler = {
    get: (target, prop) => {
        return prop in target ? target[prop] : 'Property does not exist';
    },
    set: (target, prop, value) => {
        if (prop === 'id' && typeof value !== 'number') {
            throw new TypeError('The id must be a number');
        }
        target[prop] = value;
        return true;
    }
};

const targetObject = {
    id: 1,
    name: 'Advanced JavaScript'
};

const proxy = new Proxy(targetObject, handler);

 
(async () => {
     
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        print('Fetched data: ', data);
    } catch (error) {
        print('Error during fetch: ', error);
    }

     
    print(proxy.name);  
    print(proxy.nonExistentProp);  

     
    proxy.id = 2;
    print(proxy.id);  

     
    try {
        proxy.id = 'three';
    } catch (e) {
        console.error(e.message);  
    }
})();
