 

 
const fetchData = async (endpoint) => {
    const data = {
        '/user': { id: 1, name: 'John Doe' },
        '/posts': [
            { id: 1, title: 'Hello World', content: 'This is my first post' },
            { id: 2, title: 'Learning JS', content: 'JavaScript is fun!' }
        ]
    };

     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data[endpoint]) {
                resolve(data[endpoint]);
            } else {
                reject(new Error('Endpoint not found'));
            }
        }, 1000);
    });
};

 
const loggerHandler = {
    get(target, property) {
        print(`Accessing property: ${property}`);
        return target[property];
    }
};

 
const createLoggedObject = (obj) => new Proxy(obj, loggerHandler);

 
const main = async () => {
    try {
        const user = await fetchData('/user');
        const posts = await fetchData('/posts');

         
        const loggedUser = createLoggedObject(user);
        const loggedPosts = posts.map(post => createLoggedObject(post));

        print(`User: ${loggedUser.name}`);
        loggedPosts.forEach(post => print(`Post: ${post.title}`));

         
        const idSymbol = Symbol('id');
        loggedUser[idSymbol] = loggedUser.id;

        print(`User ID from Symbol: ${loggedUser[idSymbol]}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

 
main();
