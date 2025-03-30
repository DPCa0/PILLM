class User {
    #name;
    #age;
    
    constructor(name, age) {
        this.#name = name;
        this.#age = age;
    }

    get userInfo() {
        return `${this.#name}, Age: ${this.#age}`;
    }

    static fromJSON(json) {
        const { name, age } = JSON.parse(json);
        return new User(name, age);
    }
}

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error: ", error);
    }
};

const url = "https://api.example.com/user";
fetchData(url)
    .then(data => {
        const user = User.fromJSON(JSON.stringify(data));
        print(user.userInfo);
    })
    .catch(error => console.error("Error processing data: ", error));

const calculate = (base, ...nums) => nums.reduce((acc, num) => acc + (num ** base), 0);

const promise1 = new Promise(resolve => setTimeout(resolve, 100, 'foo'));
const promise2 = new Promise((_, reject) => setTimeout(reject, 200, 'bar'));
const promise3 = Promise.resolve('baz');

Promise.any([promise1, promise2, promise3])
    .then(result => console.log(`Promise.any resolved with: ${result}`))
    .catch(error => console.error(`Promise.any error: ${error}`));

print(`Complex Calculation: ${calculate(2, 1, 2, 3)}`);
