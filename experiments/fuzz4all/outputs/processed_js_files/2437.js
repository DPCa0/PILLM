class WeatherData {
    #temperature;
    #humidity;
    constructor(temp, humidity) {
        this.#temperature = temp;
        this.#humidity = humidity;
    }

    get temperature() {
        return this.#temperature;
    }

    get humidity() {
        return this.#humidity;
    }

    *[Symbol.iterator]() {
        yield* Object.entries(this);
    }

    static async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return new WeatherData(data.temp, data.humidity);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            throw error;
        }
    }

    printData() {
        const { temperature, humidity } = this;
        print(`Temperature: ${temperature}°C, Humidity: ${humidity}%`);
    }
}

(async () => {
    try {
        const url = 'https://api.example.com/weather';
        const weatherData = await WeatherData.fetchData(url);
        weatherData.printData();

        for (const [key, value] of weatherData) {
            print(`${key}: ${value}`);
        }

        const weatherUpdates = new Proxy(weatherData, {
            set(target, prop, value) {
                print(`Weather property ${prop} changed to ${value}`);
                target[`#${prop}`] = value;
                return true;
            },
        });

        weatherUpdates.temperature = 25;
        weatherUpdates.humidity = 60;
    } catch (error) {
        console.error('Error handling weather data:', error);
    }
})();
