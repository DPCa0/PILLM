 
(async function main() {
   
  const { format } = await import('date-fns');

   
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

   
  async function fetchData() {
    await delay(1000);  
    return {
      user: { name: 'Alice', location: 'Wonderland' },
      time: new Date(),
      activity: 'Exploring'
    };
  }

   
  try {
    const { user: { name, location }, time, activity } = await fetchData();
    
     
    const formattedTime = format(time, 'MMMM do, yyyy H:mm:ss');

     
    const message = tag`User ${name} from ${location} is currently ${activity} as of ${formattedTime}.`;
    print(message);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

   
  function tag(strings, ...values) {
    return strings.reduce((prev, curr, i) => `${prev}${curr}${values[i] || ''}`, '');
  }
})();
