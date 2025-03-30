 
class ComplexFeatures {
    constructor(data) {
         
        const { message, values } = data;
        this.message = message;
        this.values = values;
    }

     
    static *generateSequence(limit) {
        for (let i = 0; i < limit; i++) {
            yield i;
        }
    }

     
    async fetchData() {
         
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.values);
            }, 1000);
        });
    }

     
    processValues(...newValues) {
        this.values = [...this.values, ...newValues];
        return this.values;
    }

     
    get formattedMessage() {
        return `Message: ${this.message}`;
    }

    set updateMessage(newMsg) {
        this.message = newMsg;
    }
}

 
(async function main() {
    const instance = new ComplexFeatures({ 
        message: 'Hello, advanced JavaScript!', 
        values: [1, 2, 3] 
    });

     
    print('Sequence:', [...ComplexFeatures.generateSequence(5)]);

     
    const data = await instance.fetchData();
    print('Fetched data:', data);

     
    print(instance.formattedMessage);
    instance.updateMessage = 'Updated message!';
    print(instance.formattedMessage);

    print('Processed Values:', instance.processValues(4, 5, 6));
})();
