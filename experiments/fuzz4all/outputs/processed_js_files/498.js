 
async function fetchRandomUser() {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    return data.results[0];
}

 
async function* userIterator(user) {
    for (const key of Object.keys(user)) {
        await new Promise(resolve => setTimeout(resolve, 500));  
        yield { key, value: user[key] };
    }
}

 
async function displayUserInfo() {
    const user = await fetchRandomUser();
    const handler = {
        get(target, prop) {
            if (prop in target) {
                print(`Accessing property: ${prop}`);
                return Reflect.get(target, prop);
            } else {
                throw new ReferenceError(`Property ${prop} does not exist`);
            }
        }
    };
    
    const proxiedUser = new Proxy(user, handler);
    print(`User Info: ${proxiedUser.name.title} ${proxiedUser.name.first} ${proxiedUser.name.last}`);
    
    print("Iterating through user properties:");
    for await (const { key, value } of userIterator(proxiedUser)) {
        print(`${key}: ${JSON.stringify(value)}`);
    }
}

 
(async () => {
    try {
        await displayUserInfo();
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
