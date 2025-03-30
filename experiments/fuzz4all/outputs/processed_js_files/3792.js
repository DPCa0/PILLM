 

class ApiFetcher {
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

class DataProcessor {
  static processUserData({ name, email, ...rest }) {
    return {
      fullName: name.toUpperCase(),
      contact: email.toLowerCase(),
      details: rest,
    };
  }
}

async function displayProcessedUserData(url) {
  const apiFetcher = new ApiFetcher(url);
  const userData = await apiFetcher.fetchData();

  if (!userData) return;

  userData.forEach(user => {
    const processedUser = DataProcessor.processUserData(user);
    print(processedUser);
  });
}

const apiURL = "https://jsonplaceholder.typicode.com/users";
displayProcessedUserData(apiURL);
