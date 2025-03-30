 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData() {
    await delay(1000);
    return { user: { name: 'Alice', age: 30 }, status: 'active' };
}

function createReactiveObject(target, callback) {
    return new Proxy(target, {
        set(obj, prop, value) {
            obj[prop] = value;
            callback(prop, value);
            return true;
        }
    });
}

async function main() {
    const { user, status } = await fetchData();
    print(`Fetched data: ${JSON.stringify({ user, status })}`);

    const reactiveUser = createReactiveObject(user, (prop, value) => {
        print(`Property ${prop} changed to ${value}`);
    });

    reactiveUser.name = 'Bob';
    reactiveUser.age = 31;

    const fetchAndLogStatus = async () => {
        const { status: newStatus } = await fetchData();
        print(`Updated status: ${newStatus}`);
    };
    
    fetchAndLogStatus();
}

main();
