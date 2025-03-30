 

const fetch = require('node-fetch');  

(async () => {
  try {
    const url = 'https://api.spacexdata.com/v4/launches/latest';  
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

    const data = await response.json();

     
    const { name, date_utc: dateUTC, cores, links: { webcast } } = data;

     
    const message = `
      Latest SpaceX Launch:
      Name: ${name}
      Date (UTC): ${new Date(dateUTC).toLocaleString()}
      Cores Used: ${cores.length}
      Webcast Link: ${webcast}
    `;

     
    const coreSet = new Set(cores.map(core => core.core));
    const coreMap = new Map();

    coreSet.forEach(coreId => {
      coreMap.set(coreId, cores.filter(c => c.core === coreId).length);
    });

     
    const displayCoreUsage = (...args) => {
      return args.map(id => `Core ID: ${id}, Flights: ${coreMap.get(id)}`).join('\n');
    };

    print(message);
    print('\nCore Usage:\n', displayCoreUsage(...coreSet));

  } catch (error) {
    console.error('Error:', error);
  }
})();
