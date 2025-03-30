 

class ApiClient {
  static baseUrl = 'https://jsonplaceholder.typicode.com';

  static async getResource(endpoint) {
    try {
      const response = await fetch(`${ApiClient.baseUrl}/${endpoint}`);
      if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
}

async function fetchUserAndPosts(userId) {
  try {
    const [user, posts] = await Promise.all([
      ApiClient.getResource(`users/${userId}`),
      ApiClient.getResource(`users/${userId}/posts`),
    ]);

    if (user && posts) {
      const { name, email } = user;
      print(`User: ${name}, Email: ${email}`);
      print('Posts:');
      posts.forEach(({ title, body }) =>
        console.log(`Title: ${title}\nBody: ${body}\n`)
      );
    }
  } catch (error) {
    console.error('Error fetching user and posts:', error);
  }
}

 
fetchUserAndPosts(1);
