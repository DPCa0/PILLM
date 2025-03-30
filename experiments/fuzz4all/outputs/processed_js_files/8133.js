class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* asyncGenerator() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
    yield await Promise.resolve(3);
}

const pipeline = async (gen) => {
    for await (const value of gen()) {
        print(`Processing: ${value}`);
        const deferred = new Deferred();
        setTimeout(() => {
            if (value % 2 === 0) {
                deferred.reject(`Error: ${value} is even!`);
            } else {
                deferred.resolve(`Success: ${value} is odd!`);
            }
        }, 1000);
        
        try {
            const result = await deferred.promise;
            print(result);
        } catch (error) {
            console.error(error);
        }
    }
};

const genInstance = asyncGenerator;
pipeline(genInstance);
