 

 
const fetchData = (delay, data) => new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
});

 
const loadData = async () => {
    const [user, posts] = await Promise.all([
        fetchData(1000, { name: 'Jane Doe', age: 28 }),
        fetchData(2000, [{ title: 'Post 1' }, { title: 'Post 2' }])
    ]);

    return { user, posts };
};

 
const createObservableObject = (obj) => new Proxy(obj, {
    set(target, property, value) {
        print(`Property ${property} set to ${value}`);
        target[property] = value;
        return true;
    }
});

(async () => {
    const data = await loadData();
    print('Data loaded:', data);

     
    const { user: { name, ...details }, posts } = data;
    print(`User Info: Name - ${name}, Details - ${JSON.stringify(details)}`);
    print(`Posts: ${posts.map(post => post.title).join(', ')}`);

     
    const userProxy = createObservableObject(data.user);
    userProxy.name = 'John Doe';   
})();
