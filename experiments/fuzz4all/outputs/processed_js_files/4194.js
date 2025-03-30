class DeferredPromise {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function* numberGenerator() {
    let num = 1;
    while (true) {
        yield num++;
    }
}

(async () => {
    const numberGen = numberGenerator();
    const numbers = Array.from({ length: 5 }, () => numberGen.next().value);

    print("Generated Numbers:", numbers.join(", "));

    const results = await Promise.all(numbers.map(async number => {
        const deferred = new DeferredPromise();
        const randomDelay = Math.floor(Math.random() * 1000);
        
        setTimeout(() => {
            const isEven = number % 2 === 0;
            if (isEven) {
                deferred.resolve(`Number ${number} is even`);
            } else {
                deferred.reject(`Number ${number} is odd`);
            }
        }, randomDelay);

        try {
            return await deferred.promise;
        } catch (error) {
            return error;
        }
    }));

    print("Results:", results.join(" | "));
})();
