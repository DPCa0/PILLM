class LazyEvaluator {
    constructor(fn) {
        this.fn = fn;
        this.result = null;
        this.evaluated = false;
    }
    
    get value() {
        if (!this.evaluated) {
            this.result = this.fn();
            this.evaluated = true;
        }
        return this.result;
    }
}

const asyncProcess = () => new Promise((resolve) => {
    setTimeout(() => resolve('Hello, advanced JavaScript!'), 1000);
});

const asyncLazyEvaluator = new LazyEvaluator(() => asyncProcess());

(async () => {
    print("Starting evaluation...");
    print(await asyncLazyEvaluator.value);
    print(await asyncLazyEvaluator.value);   
})();

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessed property: ${prop}`);
            return Reflect.get(target, prop);
        }
        return `Property "${prop}" does not exist`;
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const obj = { message: "Initial message" };
const proxy = new Proxy(obj, handler);

print(proxy.message);   
proxy.message = "Updated message";   
print(proxy.nonExistent);   
