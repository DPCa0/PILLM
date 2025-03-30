class AsyncIterator {
    constructor(data) {
        this.data = data;
        this.current = 0;
    }

    [Symbol.asyncIterator]() {
        return {
            next: () => {
                if (this.current < this.data.length) {
                    return new Promise(resolve =>
                        setTimeout(() => resolve({ value: this.data[this.current++], done: false }), 1000)
                    );
                } else {
                    return Promise.resolve({ done: true });
                }
            }
        };
    }
}

const fetchData = async () => {
    const data = ['JavaScript', 'Python', 'Java', 'C++', 'Rust'];
    const asyncIterable = new AsyncIterator(data);

    for await (const language of asyncIterable) {
        print(language);
    }
};

const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

const apiCall = debounce(() => {
    print('API call executed!');
}, 3000);

window.addEventListener('resize', apiCall);

fetchData();
