const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetching error:', error);
        return null;
    }
};

class Observable {
    constructor(value) {
        this._value = value;
        this._listeners = new Set();
    }

    subscribe(listener) {
        this._listeners.add(listener);
    }

    unsubscribe(listener) {
        this._listeners.delete(listener);
    }

    notify() {
        this._listeners.forEach(listener => listener(this._value));
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (newValue !== this._value) {
            this._value = newValue;
            this.notify();
        }
    }
}

(async () => {
    const apiData = new Observable({});
    const url = 'https://api.example.com/data';

    apiData.subscribe(data => print('New data:', data));

    const data = await fetchData(url);
    if (data) apiData.value = data;
})();

 
global.fetch = async (url) => ({
    ok: true,
    json: async () => ({ data: "Sample Data", timestamp: Date.now() })
});
