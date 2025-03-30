class ComplexFeature {
    #privateField = "I'm private!";  

    constructor() {
        this.publicField = "I'm public!";
    }

    async #privateMethod() {  
        return new Promise((resolve) => {
            setTimeout(() => resolve("Resolved after 1 second"), 1000);
        });
    }

    async publicMethod() {
        const message = await this.#privateMethod();
        print(message, this.#privateField);
    }
}

const advancedProxy = new Proxy(new ComplexFeature(), {
    get(target, property) {
        if (property in target) {
            return typeof target[property] === 'function'
                ? target[property].bind(target)
                : target[property];
        } else {
            return `Property '${property}' not found`;
        }
    },
    set(target, property, value) {
        if (property.startsWith('_')) {
            console.warn(`Attempt to modify private property '${property}' denied`);
            return false;
        }
        target[property] = value;
        return true;
    },
});

(async () => {
    print(advancedProxy.publicField);  
    await advancedProxy.publicMethod();  
    print(advancedProxy.someUndefinedProperty);  
    advancedProxy._privateField = "Trying to change";  
    advancedProxy.publicField = "I've been changed!";  
    print(advancedProxy.publicField);  
})();
