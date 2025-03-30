(async () => {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const urls = [
    'https://api.spacexdata.com/v4/launches/latest',
    'https://api.spacexdata.com/v4/rockets',
  ];

  try {
    const [latestLaunch, rockets] = await Promise.all(urls.map(fetchData));

     
    const { name: latestLaunchName, date_utc: launchDate } = latestLaunch;
    print(`Latest Launch: ${latestLaunchName} on ${launchDate}`);

     
    const uniqueRocketNames = new Set(rockets.map(({ name }) => name));
    const rocketMap = new Map(rockets.map((rocket) => [rocket.id, rocket.name]));

    print('Unique Rocket Names:', ...uniqueRocketNames);
    print('Rocket Map:', rocketMap);

     
    const handler = {
      get: (target, prop) => {
        print(`Accessed property: ${prop}`);
        return prop in target ? target[prop] : 'Property not found';
      },
    };

    const launchProxy = new Proxy(latestLaunch, handler);
    print('Accessed Launch Name:', launchProxy.name);

     
    function* rocketGenerator(rocketsArray) {
      for (const rocket of rocketsArray) {
        yield rocket;
      }
    }

    const rocketIterator = rocketGenerator(rockets);
    for (const rocket of rocketIterator) {
      print('Iterated Rocket:', rocket.name);
    }

  } catch (error) {
    console.error('Error:', error);
  }
})();
