const getUsers = () => new Promise((resolve) => {
    setTimeout(() => resolve(['Alice', 'Bob', 'Charlie']), 1000);
});

const getWeather = (user) => new Promise((resolve) => {
    setTimeout(() => resolve({ user, weather: 'sunny' }), 1000);
});

const getUserWeather = async () => {
    try {
        const users = await getUsers();
        const weatherPromises = users.map(user => getWeather(user));
        const weatherDetails = await Promise.all(weatherPromises);
        
        const result = weatherDetails.reduce((acc, { user, weather }) => {
            acc.push(`${user}: ${weather}`);
            return acc;
        }, []);
        
        print('User Weather Details:', result.join(', '));
    } catch (error) {
        console.error('Error fetching weather details:', error);
    }
};

const cachedUserWeather = (() => {
    let cache = null;
    return async () => {
        if (!cache) {
            cache = await getUserWeather();
            setTimeout(() => cache = null, 5000);  
        }
        return cache;
    };
})();

const runComplexFeatures = async () => {
    print('Fetching weather information...');
    await cachedUserWeather();
    print('Fetching from cache...');
    await cachedUserWeather();
};

runComplexFeatures();
