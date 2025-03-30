class Singleton {
    constructor(name) {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        this.name = name;
        Singleton.instance = this;
    }
    
    getName() {
        return this.name;
    }
}

function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

const asyncOperation = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Async Operation Complete!'), 1000);
    });
}

(async () => {
    const instanceA = new Singleton("Instance A");
    const instanceB = new Singleton("Instance B");

    print(instanceA.getName());  
    print(instanceB.getName());  

    const fib = fibonacci();
    print(fib.next().value);  
    print(fib.next().value);  
    print(fib.next().value);  

    const asyncResult = await asyncOperation();
    print(asyncResult);  
})();
