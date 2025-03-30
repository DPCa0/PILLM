 
const data = { message: "Hello, world!" };
const handler = {
    get(target, property) {
        print(`Accessing property '${property}': ${target[property]}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
};
const proxyData = new Proxy(data, handler);

 
async function fetchData() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/users/1'
    ];
    const fetchPromises = urls.map(url => fetch(url).then(response => response.json()));
    const [post, user] = await Promise.all(fetchPromises);
    print('Fetched Post:', post);
    print('Fetched User:', user);
    return { post, user };
}

 
async function updateMessage() {
    const { post, user } = await fetchData();
    proxyData.message = `Hello, ${user.name}! You recently posted: "${post.title}"`;
    print(proxyData.message);
}

updateMessage();
