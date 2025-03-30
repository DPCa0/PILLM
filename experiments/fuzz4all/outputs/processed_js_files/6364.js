 
class ComplexClass {
     
    #data;
    #callback;

    constructor(initialData, callback) {
        this.#data = initialData;
        this.#callback = callback;
    }

     
    #processData() {
         
        const process = async function* (data) {
            for (const item of data) {
                yield await new Promise((resolve) => 
                    setTimeout(() => resolve(item * 2), 100)
                );
            }
        };

        (async () => {
            const generator = process(this.#data);
            for await (const result of generator) {
                this.#callback(result);
            }
        })();
    }

     
    startProcessing() {
        this.#processData();
    }
}

 
const handler = {
    get(target, prop) {
        if (prop === 'startProcessing') {
            print('Start processing intercepted!');
        }
        return target[prop];
    },
};

const initialData = [1, 2, 3, 4, 5];
const callback = (result) => print('Processed:', result);

const complexInstance = new ComplexClass(initialData, callback);
const proxyInstance = new Proxy(complexInstance, handler);

 
proxyInstance.startProcessing();
