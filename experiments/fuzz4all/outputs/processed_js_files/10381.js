 

function* generateNumbers() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

const asyncOperation = (num) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(`Processed number: ${num}`);
    }, Math.random() * 1000);
});

const handler = {
    get: function(target, property) {
        if (property === 'next') {
            return async function() {
                const { value } = target.next();
                return await asyncOperation(value);
            };
        }
        return Reflect.get(...arguments);
    }
};

const generator = generateNumbers();
const proxy = new Proxy(generator, handler);

(async () => {
    for (let i = 0; i < 5; i++) {
        const result = await proxy.next();
        print(result);
    }
})();
