 

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Fetched Data"), 1000);
    });
};

 
function createCounter() {
    let count = 0;
    return {
        increment() {
            count++;
            return count;
        },
        getCount() {
            return count;
        },
    };
}

const counter = createCounter();

 
const targetObj = { message: "Hello", status: "Active" };
const handler = {
    get(target, prop) {
        print(`Getting property: ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    },
};

const proxy = new Proxy(targetObj, handler);

 
(async () => {
    print("Counter before increment:", counter.getCount());

    const data = await fetchData();
    print("Async Operation Result:", data);

    counter.increment();
    print("Counter after increment:", counter.getCount());

    print("Proxy message:", proxy.message);
    proxy.status = "Inactive";
    print("Proxy status changed to:", proxy.status);
})();
