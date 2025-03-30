(async () => {
    const fetchData = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    };

    class EventEmitter {
        constructor() {
            this.events = new Map();
        }

        on(event, listener) {
            if (!this.events.has(event)) {
                this.events.set(event, []);
            }
            this.events.get(event).push(listener);
        }

        emit(event, data) {
            const listeners = this.events.get(event);
            if (listeners) {
                listeners.forEach(listener => listener(data));
            }
        }
    }

    const processData = (data) => {
        const filteredData = data.filter(item => item.completed);
        return filteredData.map(({ id, title }) => ({ id, title }));
    };

    const url = 'https://jsonplaceholder.typicode.com/todos';
    const emitter = new EventEmitter();

    emitter.on('dataLoaded', (data) => {
        print('Processed Data:', processData(data));
    });

    try {
        const data = await fetchData(url);
        emitter.emit('dataLoaded', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
