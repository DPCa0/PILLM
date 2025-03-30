 

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData() {
    await delay(1000);  
    return { id: 1, name: 'Alice', age: 25, city: 'Wonderland' };
}

const loggingHandler = {
    get(target, property) {
        if (property in target) {
            print(`Getting ${property}: ${target[property]}`);
            return target[property];
        } else {
            console.error(`Property ${property} not found`);
            return undefined;
        }
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

(async () => {
    const userData = await fetchData();
    const { id, name, ...rest } = userData;  

    const proxiedUser = new Proxy({ id, name, ...rest }, loggingHandler);

    print(proxiedUser.name);   
    proxiedUser.age = 26;            

    const introduce = ({ name, city }) => `Hi, I'm ${name} from ${city}.`;
    print(introduce(proxiedUser));  
})();
