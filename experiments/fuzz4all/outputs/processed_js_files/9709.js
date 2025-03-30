 

 
const fakeApiResponse = {
    users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
    posts: [{ id: 1, title: 'Hello World' }, { id: 2, title: 'Advanced JavaScript' }]
};

 
const fetchData = (endpoint) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(fakeApiResponse[endpoint]), 1000);
    });
};

 
const apiHandler = {
    get(target, prop) {
        if (prop in target) {
            return Reflect.get(target, prop);
        }
        return async () => {
            print(`Fetching data from /${prop}`);
            return await fetchData(prop);
        };
    }
};

 
const API = new Proxy({}, apiHandler);

 
const main = async () => {
    try {
        print('Start fetching...');
        const users = await API.users();  
        print('Users:', users);

        const posts = await API.posts();  
        print('Posts:', posts);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

main();
