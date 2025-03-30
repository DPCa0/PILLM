 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const logHandler = {
    get(target, prop, receiver) {
        print(`Getting property ${String(prop)}`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value, receiver) {
        print(`Setting property ${String(prop)} to ${value}`);
        return Reflect.set(...arguments);
    }
};

let person = {
    firstName: "John",
    lastName: "Doe",
    async fullName() {
         
        await delay(1000);
        return `${this.firstName} ${this.lastName}`;
    }
};

 
const proxyPerson = new Proxy(person, logHandler);

 
async function greetPerson() {
    let name = await proxyPerson.fullName();
    print(`Hello, ${name}!`);
    
     
    proxyPerson.firstName = "Jane";
    name = await proxyPerson.fullName();
    print(`Hello, ${name}!`);
}

 
greetPerson();
