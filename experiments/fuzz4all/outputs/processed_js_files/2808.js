class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomError';
    }
}

const asyncIterable = {
    [Symbol.asyncIterator]() {
        let i = 0;
        return {
            next() {
                if (i < 5) {
                    return Promise.resolve({ value: i++, done: false });
                } else {
                    return Promise.resolve({ done: true });
                }
            }
        };
    }
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* generator() {
    for await (const num of asyncIterable) {
        yield await Promise.all([
            delay(1000).then(() => `Value: ${num}`),
            delay(500).then(() => num * num)
        ]);
    }
}

const fetchData = async url => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new CustomError('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

(async () => {
    const url = 'https://api.example.com/data';
    const data = await fetchData(url);
    if (data) {
        print('Fetched data:', data);
    }

    for await (const [description, square] of generator()) {
        print(description, square);
    }
})();
