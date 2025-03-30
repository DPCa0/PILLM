 

const apiSimulation = url => new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = {
            '/user': { name: 'John Doe', age: 30 },
            '/posts': [{ id: 1, title: 'JavaScript Advanced' }]
        };
        data[url] ? resolve(data[url]) : reject(new Error('404: Not Found'));
    }, 1000);
});

const fetchData = async (url) => {
    try {
        const data = await apiSimulation(url);
        print(`Data fetched from ${url}:`, data);
    } catch (error) {
        console.error(error.message);
    }
};

 
const handler = {
    set(target, property, value) {
        print(`Property ${property} changed from ${target[property]} to ${value}`);
        target[property] = value;
        return true;
    }
};

const user = new Proxy({ name: 'Jane Doe', age: 25 }, handler);

(async () => {
     
    await fetchData('/user');
    await fetchData('/posts');
    await fetchData('/comments');   

     
    user.name = 'Alice Smith';
    user.age = 26;
})();
