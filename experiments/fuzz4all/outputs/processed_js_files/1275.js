 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                userId: 1,
                name: 'John Doe',
                email: 'john.doe@example.com'
            });
        }, 1000);
    });
}

 
function* userUpdates() {
    yield { property: 'name', value: 'Jane Doe' };
    yield { property: 'email', value: 'jane.doe@example.com' };
}

 
const handler = {
    set: (target, property, value) => {
        print(`Property ${property} set to ${value}`);
        target[property] = value;
        return true;
    }
};

 
async function main() {
    let user = await fetchData();
    print('Initial User:', user);

     
    const userProxy = new Proxy(user, handler);

     
    const updates = userUpdates();
    for (let update of updates) {
        userProxy[update.property] = update.value;
    }

    print('Updated User:', user);
}

 
main().catch(console.error);
