class ComplexOperations {
    constructor() {
        this.data = new Map();
    }

    async fetchData() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        this.data.set('posts', posts);
    }

    async* processData() {
        if (!this.data.has('posts')) await this.fetchData();

        for (const post of this.data.get('posts')) {
            const { title, body } = post;
            yield `Title: ${title}\nBody: ${body}`;
        }
    }

    applyHigherOrderFunction(arr, func) {
        return arr.map(func).filter((item) => item.length < 100);
    }
}

(async () => {
    const operations = new ComplexOperations();

    await operations.fetchData();
    const postIterator = operations.processData();

    print("Processing posts using generator and async function:");
    for await (const processedPost of postIterator) {
        print(processedPost);
    }

    const sampleArray = ['hello', 'world', 'JavaScript', 'is', 'awesome', 'complexity'];
    const result = operations.applyHigherOrderFunction(sampleArray, (word) => word.toUpperCase());

    print("\nProcessed array using higher-order functions:");
    print(result);
})();
