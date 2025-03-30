class AsyncComputation {
    constructor() {
        this.cache = new Map();
    }

     
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

     
    #complexCalculation(x) {
         
        return Math.sin(x) ** 2 + Math.cos(x) ** 2;
    }

     
    proxyHandler() {
        return {
            get: (target, prop) => {
                if (this.cache.has(prop)) {
                    print(`Fetching from cache: ${prop}`);
                    return this.cache.get(prop);
                }
                const value = target[prop];
                print(`Calculating: ${prop}`);
                this.cache.set(prop, value);
                return value;
            }
        };
    }

     
    async performComputation(input) {
        print(`Starting computation for input: ${input}`);
        await this.delay(1000);  
        const result = this.#complexCalculation(input);
        return result;
    }
}

(async () => {
    const computation = new AsyncComputation();
    const proxiedComputation = new Proxy(computation, computation.proxyHandler());

    for (let i = 0; i < 3; i++) {
        const input = Math.random() * Math.PI;
        const result = await proxiedComputation.performComputation(input);
        print(`Result for input ${input}: ${result}`);
    }
})();
