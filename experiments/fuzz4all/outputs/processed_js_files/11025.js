 
async function fetchDataAndProcess() {
    try {
         
        const response = await fetch('https://api.spacexdata.com/v4/launches/latest');
        const data = await response.json();

         
        const { name, date_utc: dateUTC, links: { webcast } } = data;
        
         
        print(`Latest SpaceX Launch: ${name} on ${new Date(dateUTC).toLocaleDateString()}`);
        print(`Watch the webcast here: ${webcast}`);

         
        await Promise.all([
            processTask('Task 1', 1000),
            processTask('Task 2', 2000),
            processTask('Task 3', 1500)
        ]);

        print('All tasks processed successfully.');
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

 
function processTask(taskName, duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            print(`${taskName} processed.`);
            resolve();
        }, duration);
    });
}

 
fetchDataAndProcess();
