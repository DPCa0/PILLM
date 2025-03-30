 

 
export const getWeatherData = async (location) => {
    const API_KEY = 'YOUR_API_KEY';
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Failed to fetch weather data');
    return await response.json();
};

 
(async () => {
    try {
        const { getWeatherData } = await import('./weatherModule.mjs');
        const location = 'New York';
        const { current: { temp_c, condition: { text } }, location: { name, region } } = await getWeatherData(location);
        print(`The current weather in ${name}, ${region} is ${temp_c}°C with ${text}.`);
    } catch (error) {
        console.error('Error:', error);
    }
})();
This program demonstrates the use of ES6 modules, async/await for asynchronous operations, destructuring to extract data, and error handling with try/catch. Please make sure to replace `'YOUR_API_KEY'` with a valid API key for this code to work.