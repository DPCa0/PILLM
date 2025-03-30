class AdvancedFeatureShowcase {
    #privateField = "I'm private!";  

    constructor(name) {
        this.name = name;
        this.#init();
    }

    async #init() {
        try {
            const response = await this.#fetchData();
            print(`Data fetched for ${this.name}:`, response);
            this.#privateMethod();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    #fetchData() {  
         
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const shouldFail = Math.random() > 0.8;
                if (shouldFail) reject("Fetch failed!");
                else resolve({ id: 1, value: 'Some fetched data' });
            }, 1000);
        });
    }

    #privateMethod() {
        print("Accessing private field from private method:", this.#privateField);
    }

    *generatorFunction() {  
        let index = 0;
        while (index < 3) {
            yield index++;
        }
    }

    static run() {
        const showcase = new AdvancedFeatureShowcase('Advanced Feature User');
        const generator = showcase.generatorFunction();

        for (const value of generator) {
            print(`Generated value: ${value}`);
        }
    }
}

AdvancedFeatureShowcase.run();
