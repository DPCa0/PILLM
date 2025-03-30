 
 

const fetch = require('node-fetch');  

const API_URL = 'https://api.spacexdata.com/v4/launches/latest';

async function getLatestLaunchDetails() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();

    const { name, date_utc, links: { webcast }, cores } = data;
    
    const coreDetails = cores.map(({ core, flight, landing_attempt, landing_success }) => ({
      core,
      flight,
      landingAttempt: landing_attempt,
      landingSuccess: landing_success,
    }));

    return {
      name,
      date: new Date(date_utc).toLocaleDateString(),
      webcast,
      coreDetails,
    };
  } catch (error) {
    console.error("Failed to fetch launch details:", error);
  }
}

function displayLaunchDetails(launchDetails) {
  if (!launchDetails) return;

  const { name, date, webcast, coreDetails } = launchDetails;
  print(`Launch Name: ${name}`);
  print(`Launch Date: ${date}`);
  print(`Webcast: ${webcast}`);
  print('Core Details:');
  coreDetails.forEach(({ core, flight, landingAttempt, landingSuccess }) => {
    print(`  - Core: ${core}`);
    print(`    Flight Number: ${flight}`);
    print(`    Landing Attempt: ${landingAttempt ? 'Yes' : 'No'}`);
    print(`    Landing Success: ${landingSuccess ? 'Yes' : 'No'}`);
  });
}

(async function execute() {
  const latestLaunchDetails = await getLatestLaunchDetails();
  displayLaunchDetails(latestLaunchDetails);
})();
