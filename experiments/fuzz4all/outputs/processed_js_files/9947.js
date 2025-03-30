 
const asyncOperation = (value) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (value < 0.5) {
            resolve(`Resolved with value: ${value}`);
        } else {
            reject(`Rejected with value: ${value}`);
        }
    }, 1000);
});

 
const performOperations = async () => {
    try {
         
        const obj = { a: 1, b: 2, c: 3 };
        const { a, ...rest } = obj;
        print(`Destructured a: ${a}, Rest:`, rest);

         
        const tag = (strings, ...values) => {
            return strings.raw.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
        };
        const taggedMessage = tag`Object a: ${a}, Rest: ${JSON.stringify(rest)}`;
        print(taggedMessage);

         
        const values = Array.from({ length: 5 }, () => Math.random());
        print(`Initial values: ${values}`);

        const results = await Promise.allSettled(values.map(async (value) => {
            try {
                const res = await asyncOperation(value);
                return { status: 'fulfilled', value: res };
            } catch (err) {
                return { status: 'rejected', reason: err };
            }
        }));

         
        results.forEach((result, index) => {
            const message = result.status === 'fulfilled' 
                ? `Success: ${result.value}`
                : `Failure: ${result.reason ?? 'No reason provided'}`;
            print(`Operation ${index + 1}:`, message);
        });
    } catch (error) {
        console.error('Error in performOperations:', error);
    }
};

 
(async () => {
    await performOperations();
})();
