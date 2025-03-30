class ComplexOperation {
    #privateData = "I am private!";
    
    constructor() {
        this.data = [1, 2, 3, 4, 5];
    }

    *processData() {
        for (let num of this.data) {
            yield num * num;
        }
    }

    async fetchData() {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        if (!response.ok) throw new Error("Network response was not ok.");
        return await response.json();
    }

    async #logPrivateData() {
        print(this.#privateData);
    }

    static async performOperation() {
        const operation = new ComplexOperation();
        
        for (const value of operation.processData()) {
            print(value);
        }

        try {
            const data = await operation.fetchData();
            print(`Fetched Data: ${JSON.stringify(data)}`);
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }

        await operation.#logPrivateData();
    }
}

(async () => {
    await ComplexOperation.performOperation();
})();
