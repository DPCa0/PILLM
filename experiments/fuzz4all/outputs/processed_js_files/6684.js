 
function readonly(target, name, descriptor) {
    descriptor.writable = false;
    return descriptor;
}

class ComplexSystem {
    constructor() {
        this.version = "1.0";
        this.components = new Map();
    }

    @readonly
    getVersion() {
        return this.version;
    }

    addComponent(name, component) {
        this.components.set(name, component);
    }

    async initialize() {
        for (let [name, component] of this.components.entries()) {
            await component.initialize();
            print(`Initialized component: ${name}`);
        }
    }
}

class Component {
    constructor(name) {
        this.name = name;
    }

    async initialize() {
        return new Promise((resolve) => {
            setTimeout(() => {
                print(`Component ${this.name} is ready`);
                resolve();
            }, Math.random() * 1000);
        });
    }
}

 
function* createComponents(names) {
    for (const name of names) {
        yield new Component(name);
    }
}

 
const system = new ComplexSystem();
const componentNames = ["Auth", "Database", "API", "UI"];
const components = [...createComponents(componentNames)];

components.forEach(component => system.addComponent(component.name, component));

system.initialize().then(() => {
    print(`System version: ${system.getVersion()}`);
});
