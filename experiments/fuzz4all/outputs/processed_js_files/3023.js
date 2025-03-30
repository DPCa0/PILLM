 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        let data = await response.json();
        
         
        const { name, capital, region } = data[0];
        print(`Country: ${name}, Capital: ${capital}, Region: ${region}`);
        
         
        const populationSum = data.map(country => country.population).reduce((sum, pop) => sum + pop, 0);
        print(`Total Population: ${populationSum.toLocaleString()}`);
        
         
        const uniqueRegions = [...new Set(data.map(country => country.region))];
        print(`Unique Regions: ${uniqueRegions.join(', ')}`);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const startFetching = () => {
    const url = 'https://restcountries.com/v3.1/all';
    fetchData(url);
};

 
setTimeout(startFetching, 1000);
