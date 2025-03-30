 
class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.apiUrl}/${endpoint}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

const processUserData = async (userId) => {
  const apiClient = new DataFetcher('https://jsonplaceholder.typicode.com');
  
  const userData = await apiClient.fetchData(`users/${userId}`);
  const userPosts = await apiClient.fetchData(`posts?userId=${userId}`);
  
  const userSummary = {
    name: userData?.name,
    email: userData?.email,
    postTitles: userPosts?.map(post => post.title)
  };

  print('User Summary:', userSummary);
  
  return new Promise((resolve) => setTimeout(() => {
    print('Promise resolved after delay');
    resolve(userSummary);
  }, 2000));
};

 
(async () => {
  try {
    const userId = 1;
    const userSummary = await processUserData(userId);
    
    print('Final Output:', userSummary);
  } catch (err) {
    console.error('Error processing user data:', err);
  }
})();
