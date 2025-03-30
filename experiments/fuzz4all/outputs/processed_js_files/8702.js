 

const fetchData = async (url) => {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    } catch (error) {
        console.error(`Fetch error: ${error}`);
    }
};

const processUserData = async (userId) => {
    const [userData, postIds] = await Promise.all([
        fetchData(`https: 
        fetchData(`https: 
    ]);

    return { ...userData, posts: postIds.map(post => post.id) };
};

const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting ${prop} from user data.`);
            return Reflect.get(target, prop, receiver);
        } else {
            console.warn(`Property ${prop} not found.`);
            return undefined;
        }
    },
    set(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}.`);
        return Reflect.set(target, prop, value, receiver);
    }
};

(async () => {
    const userId = 1;
    const userData = await processUserData(userId);
    const proxyUserData = new Proxy(userData, handler);

    print(`User: ${proxyUserData.name}`);
    proxyUserData.email = 'new.email@example.com';
    print(`Email: ${proxyUserData.email}`);
})();
