class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }
    
    emit(event, ...args) {
        if (this.events[event]) this.events[event].forEach(listener => listener(...args));
    }
}

async function fetchWithTimeout(url, timeout = 3000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('Fetch request timed out');
        } else {
            console.error('Fetch error:', error.message);
        }
    }
}

class MyAdvancedComponent extends EventEmitter {
    constructor() {
        super();
        this.state = new Proxy({ data: null }, {
            set: (target, key, value) => {
                target[key] = value;
                this.emit('stateChange', this.state);
                return true;
            }
        });
    }

    async loadData(url) {
        this.state.data = await fetchWithTimeout(url);
    }
}

const component = new MyAdvancedComponent();

component.on('stateChange', (state) => {
    print('State updated:', state);
});

(async () => {
    await component.loadData('https://jsonplaceholder.typicode.com/todos/1');
})();
