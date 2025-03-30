(async function advancedFeatureShowcase() {
    const fetchData = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    };

    const processData = (data) => {
        return data.map(({ name, height, mass }) => ({
            name: name.toUpperCase(),
            bmi: (mass / ((height / 100) ** 2)).toFixed(2),
        })).filter(person => person.bmi < 25);
    };

    const url = 'https://swapi.dev/api/people/';
    try {
        const data = await fetchData(url);
        const processedData = processData(data.results);
        
        for (const { name, bmi } of processedData) {
            print(`Name: ${name}, BMI: ${bmi}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
