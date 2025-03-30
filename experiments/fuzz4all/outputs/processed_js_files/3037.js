 

 
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.5;  
            success ? resolve({ data: 'Fetched Data!' }) : reject('Fetch Error');
        }, 1000);
    });
}

 
async function processFetch() {
    try {
        const { data } = await fetchData();
        print(`Success: ${data}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

 
const processCollection = () => {
    const items = [1, 2, 3, 4, 5];
    const mapped = new Map();

    items.forEach(item => mapped.set(item, item * 2));
    
    const uniqueItems = new Set([...mapped.values(), 10, 12]);  
    
    print('Mapped Values:', [...mapped.entries()]);
    print('Unique Set Values:', [...uniqueItems]);
};

 
class ComplexClass {
    #privateField;

    constructor(value) {
        this.#privateField = value;
    }

    get doublePrivate() {
        return this.#privateField * 2;
    }

    static greet() {
        print('Greetings from ComplexClass!');
    }
}

 
processFetch();
processCollection();

const instance = new ComplexClass(21);
print('Double Private Field:', instance.doublePrivate);
ComplexClass.greet();
