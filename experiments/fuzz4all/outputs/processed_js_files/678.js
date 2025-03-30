class Person {
    constructor(name) {
        this.name = name;
    }
    greet() {
        return `Hello, my name is ${this.name}`;
    }
}

class Developer extends Person {
    #languages = new Set();
    constructor(name, ...langs) {
        super(name);
        this.#languages = new Set(langs);
    }
    addLanguage(lang) {
        this.#languages.add(lang);
    }
    get languages() {
        return [...this.#languages];
    }
}

const pipeline = async function* (data) {
    for await (const item of data) {
        yield item * 2;
    }
};

(async () => {
    const dev = new Developer('Alice', 'JavaScript', 'Python');
    dev.addLanguage('Rust');
    
    print(dev.greet());
    print(`I code in: ${dev.languages.join(', ')}`);

    const asyncData = [1, 2, 3, 4];
    for await (const transformed of pipeline(asyncData)) {
        print(`Transformed: ${transformed}`);
    }
})();

const dynamicImportDemo = async () => {
    if (Math.random() > 0.5) {
        const { default: _ } = await import('lodash');
        print(_.upperCase('dynamic lodash import!'));
    } else {
        print('No import this time.');
    }
};

dynamicImportDemo();
