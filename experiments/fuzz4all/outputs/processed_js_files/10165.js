 
async function fetchDataAndProcess() {
  try {
     
    const response = await fetch('https://api.spacexdata.com/v4/launches/latest');
    if (!response.ok) throw new Error(`Error: ${response.status}`);

     
    const { name, date_utc, links: { webcast }, rocket } = await response.json();

     
    const rocketResponse = await fetch(`https: 
    if (!rocketResponse.ok) throw new Error(`Error: ${rocketResponse.status}`);

    const { name: rocketName, stages, description } = await rocketResponse.json();

     
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
    }).format(new Date(date_utc));

     
    const output = `
      Latest SpaceX Launch:
      - Mission: ${name}
      - Date: ${formattedDate}
      - Rocket: ${rocketName} (${stages} stages)
      - Details: ${description}
      - Webcast: ${webcast ? webcast : 'Unavailable'}
    `;

     
    print(sanitizeHTML`${output}`);

  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
  }
}

 
function sanitizeHTML(strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i - 1];
    return `${result}${sanitizeValue(value)}${string}`;
  });

  function sanitizeValue(value) {
    if (!value) return '';
    return String(value).replace(/[&<>"']/g, (match) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    })[match]);
  }
}

 
fetchDataAndProcess();
