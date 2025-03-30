 
async function fetchData(url) {
    try {
         
        let response = await fetch(url);
        let data = await response.json();

         
        const handler = {
            get: function(target, name) {
                return name in target ? target[name] : 'Property does not exist';
            }
        };

         
        const proxyData = new Proxy(data, handler);

         
        print(proxyData.results[0]?.name ?? 'No name found');
        print(proxyData.results[0]?.height ?? 'No height found');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
(async () => {
    const apiUrl = 'https://swapi.dev/api/people/';
    await fetchData(apiUrl);
})();
