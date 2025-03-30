 

 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
}

 
function* paginateData(data, pageSize) {
    for (let i = 0; i < data.length; i += pageSize) {
        yield data.slice(i, i + pageSize);
    }
}

 
const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            return obj[prop];
        } else {
            throw new ReferenceError(`Property "${prop}" does not exist.`);
        }
    },
    set: (obj, prop, value) => {
        if (typeof value === 'string') {
            obj[prop] = value.toUpperCase();
            return true;
        } else {
            throw new TypeError(`Value for "${prop}" must be a string.`);
        }
    }
};

 
const user = new Proxy({ name: 'John Doe', profession: 'developer' }, handler);

 
(async function() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    try {
        const data = await fetchData(url);
        const pageSize = 5;
        const paginator = paginateData(data, pageSize);

        let page = paginator.next();
        while (!page.done) {
            print(page.value);
            page = paginator.next();
        }

        print(`User name: ${user.name}`);   
        user.profession = 'designer';             
        print(`User profession: ${user.profession}`);
    } catch (error) {
        console.error('Error:', error);
    }
})();
