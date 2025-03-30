 

class ApiClient {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error: ", error);
      throw error;
    }
  }
}

class DataProcessor {
  static processUser({ id, name, email }) {
    print(`User ID: ${id}, Name: ${name}, Email: ${email}`);
  }

  static async processPosts(posts) {
    for (const { id, title } of posts) {
      print(`Post ID: ${id}, Title: ${title}`);
    }
  }
}

(async () => {
  const apiClient = new ApiClient("https://jsonplaceholder.typicode.com");

  try {
    const user = await apiClient.fetchData('/users/1');
    DataProcessor.processUser(user);

    const posts = await apiClient.fetchData('/posts?userId=1');
    await DataProcessor.processPosts(posts);
  } catch (error) {
    console.error("An error occurred while processing the data", error);
  }
})();
