 

(async () => {
  try {
     
    let response = await fetch('https://api.spacexdata.com/v4/launches/latest');
    let launchData = await response.json();
    
     
    const { name, date_utc, rocket } = launchData;

     
    let rocketResponse = await fetch(`https: 
    let rocketData = await rocketResponse.json();
    const { name: rocketName, description } = rocketData;
    
     
    const message = `The latest SpaceX launch was "${name}" on ${new Date(date_utc).toDateString()} using the rocket "${rocketName}". Description: ${description}`;
    
     
    print(message);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
