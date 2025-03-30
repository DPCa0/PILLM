 
 

 
const fetchData = async (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: `Data from ${url}` });
        }, 1000);
    });
};

 
const createReactiveObject = (obj, handler) => {
    return new Proxy(obj, handler);
};

 
const handler = {
    get: (target, prop, receiver) => {
        if (Reflect.has(target, prop)) {
             
            if (!target[prop].isFetched) {
                target[prop].isFetched = true;
                fetchData(target[prop].url).then((response) => {
                    target[prop].data = response.data;
                    print(`Fetched: ${target[prop].data}`);
                });
            }
            return Reflect.get(target, prop, receiver).data;
        }
        return undefined;
    },
    set: (target, prop, value) => {
         
        target[prop] = { url: value, data: null, isFetched: false };
        return true;
    }
};

 
const reactiveObj = createReactiveObject({
    user: { url: 'https://api.example.com/user', data: null, isFetched: false },
    posts: { url: 'https://api.example.com/posts', data: null, isFetched: false }
}, handler);

 
(async () => {
    print('Before accessing any data');
    print('User:', reactiveObj.user);  
    print('Posts:', reactiveObj.posts);  
    await new Promise((resolve) => setTimeout(resolve, 2000));  
    print('After data fetched');
    print('User:', reactiveObj.user);
    print('Posts:', reactiveObj.posts);
})();
