 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

const processData = async (url) => {
  const fetcher = new DataFetcher(url);
  const data = await fetcher.fetchData();

  if (data && data.results) {
     
    const [{ name: firstName }, { name: secondName }, ...others] = data.results;

    print(`First Name: ${firstName}`);
    print(`Second Name: ${secondName}`);
    print("Other Results:", others);

     
    const resultsPromises = data.results.map(async ({ name }) => {
      const nameResponse = await fetch(`https: 
      return nameResponse.json();
    });

    try {
      const details = await Promise.all(resultsPromises);
      print("Fetched Details:", details);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  }
};

const myURL = "https://pokeapi.co/api/v2/pokemon";
processData(myURL);
