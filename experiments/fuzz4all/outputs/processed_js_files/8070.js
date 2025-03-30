 

 
function* fetchData() {
    yield new Promise(resolve => setTimeout(() => resolve('User: John Doe'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Email: john@example.com'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Subscription: Active'), 1000));
}

 
const handler = {
    get(target, property) {
        print(`Accessing property ${property}`);
        return target[property];
    }
};

 
async function runGenerator(genFunc) {
    const dataGen = genFunc();
    const dataList = [];
    
    for await (const data of dataGen) {
        dataList.push(data);
    }

     
    const [user, email, subscription] = dataList;
    return { user, email, subscription };
}

(async () => {
     
    const profileData = await runGenerator(fetchData);
    const proxiedData = new Proxy(profileData, handler);

     
    print(proxiedData.user);
    print(proxiedData.email);
    print(proxiedData.subscription);
})();
