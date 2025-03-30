 

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchData() {
    print("Fetching data...");
    await delay(1000);  
    print("Data fetched!");
    return { user: { name: "Alice", age: 30, location: "Wonderland" } };
}

const handler = {
    get(target, property, receiver) {
        if (property in target) {
            return Reflect.get(target, property, receiver);
        } else {
            print(`Property "${property}" not found.`);
        }
    },
    set(target, property, value) {
        if (typeof value === "number") {
            if (value >= 0) {
                return Reflect.set(target, property, value);
            } else {
                print(`Invalid value "${value}" for "${property}"`);
                return false;
            }
        }
        return Reflect.set(target, property, value);
    }
};

async function main() {
    const data = await fetchData();
    const proxiedUser = new Proxy(data.user, handler);

    print(`Name: ${proxiedUser.name}`);
    print(`Age: ${proxiedUser.age}`);

    proxiedUser.age = 25;  
    print(`Updated Age: ${proxiedUser.age}`);

    proxiedUser.age = -1;  
    print(`Attempt to set invalid Age`);

    print(`Location: ${proxiedUser.location}`);
    print(`Country: ${proxiedUser.country}`);  
}

main().catch((err) => console.error(err));
