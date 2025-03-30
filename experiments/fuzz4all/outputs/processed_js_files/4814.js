class FetchError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

async function fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchPromise = fetch(url, { ...options, signal });
    
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetchPromise;
        if (!response.ok) {
            throw new FetchError(`HTTP error! Status: ${response.status}`, response.status);
        }
        return await response.json();
    } finally {
        clearTimeout(timeoutId);
    }
}

const complexObject = {
    value: 42,
    calculate: function() {
        const { value } = this;
        return new Proxy(this, {
            get(target, prop) {
                if (prop === 'doubleValue') {
                    return value * 2;
                }
                return Reflect.get(...arguments);
            }
        });
    },
    async fetchAndCompute() {
        try {
            const data = await fetchWithTimeout('https://api.example.com/data');
            return { ...this.calculate(), data };
        } catch (error) {
            console.error(error instanceof FetchError ? `FetchError: ${error.message}` : error);
            return null;
        }
    }
};

(async () => {
    const result = await complexObject.fetchAndCompute();
    if (result) {
        print('Double Value:', result.doubleValue);
        print('Fetched Data:', result.data);
    }
})();
