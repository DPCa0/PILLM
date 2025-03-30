 
const fetchData = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
const logger = {
    get: function(target, property) {
        print(`Accessed property "${property}" with value: ${target[property]}`);
        return target[property];
    },
    set: function(target, property, value) {
        print(`Setting property "${property}" to value: ${value}`);
        target[property] = value;
    }
};

 
const showPostInfo = ({ id, title, body }) => {
    print(`Post #${id}: ${title}`);
    print(`Body: ${body}`);
};

 
(async () => {
    const data = await fetchData();
    if (data) {
        const postProxy = new Proxy(data[0], logger);
        showPostInfo(postProxy);

         
        print(postProxy.title);
        postProxy.title = 'Updated Title';
    }
})();
