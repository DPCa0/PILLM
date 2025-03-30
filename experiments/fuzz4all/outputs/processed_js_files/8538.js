 

 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { name: "JavaScript", year: 1995 };
            url ? resolve(data) : reject("Invalid URL");
        }, 1000);
    });
};

 
const displayData = async () => {
    try {
        const url = "https://api.example.com/data";
        const { name, year } = await fetchData(url);
        print(`Fetched: ${name}, Year: ${year}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

 
const handler = {
    get: (target, prop) => {
        print(`Getting property ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const dataProxy = new Proxy({ framework: "React", released: 2013 }, handler);

 
displayData();
print(dataProxy.framework);  
dataProxy.released = 2014;  
