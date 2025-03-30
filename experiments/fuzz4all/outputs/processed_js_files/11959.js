 

(async function complexFeatureDemo() {
  try {
     
    const fetchJSON = async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    };

     
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

     
    const getDataWithDelay = async (url, delayTime) => {
      await delay(delayTime);
      return fetchJSON(url);
    };

     
    const { name, age } = await getDataWithDelay('https://randomuser.me/api/?inc=name,dob', 2000).then(data => ({
      name: data.results[0].name.first,
      age: data.results[0].dob.age
    }));

     
    print(`Fetched User Info: Name - ${name}, Age - ${age}`);

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
