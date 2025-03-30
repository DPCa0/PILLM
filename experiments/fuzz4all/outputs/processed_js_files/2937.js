 
class ComplexObject {
    constructor(name) {
        this.name = name;
    }

    async fetchData() {
         
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Data for ${this.name}`);
            }, 1000);
        });
    }
}

 
const handler = {
    get(target, property, receiver) {
        print(`Getting property ${property}`);
        if (property in target) {
            return Reflect.get(target, property, receiver);
        } else {
            return `Property ${property} does not exist on target object.`;
        }
    },
    set(target, property, value) {
        if (typeof value === 'string' && value.length > 0) {
            print(`Setting property ${property} to ${value}`);
            return Reflect.set(target, property, value);
        } else {
            console.error(`Invalid value for ${property}`);
            return false;
        }
    }
};

 
const proxiedObject = new Proxy(new ComplexObject("Example"), handler);

 
async function demonstrateComplexFeatures() {
    print(proxiedObject.name);  

    proxiedObject.name = "New Example";  
    proxiedObject.name = "";  

    try {
        const data = await proxiedObject.fetchData();
        print(data);  
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

demonstrateComplexFeatures();
