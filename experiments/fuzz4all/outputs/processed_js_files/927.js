 

class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetchData(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }
}

const handler = {
  get: function(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      print(`Property ${prop} does not exist.`);
      return () => null;
    }
  }
};

class EnhancedAPI extends API {
  constructor(baseURL) {
    super(baseURL);
    return new Proxy(this, handler);
  }

  async getUserData(userId) {
    return this.fetchData(`/users/${userId}`);
  }

  async getPostData(postId) {
    return this.fetchData(`/posts/${postId}`);
  }
}

const processData = async ({ userId, postId }, ...extraIds) => {
  try {
    const api = new EnhancedAPI('https://jsonplaceholder.typicode.com');
    
    const [userData, postData] = await Promise.all([
      api.getUserData(userId),
      api.getPostData(postId)
    ]);

    print('User Data:', userData);
    print('Post Data:', postData);

    for (const id of extraIds) {
      print(`Fetching extra data for ID: ${id}`);
      const extraData = await api.fetchData(`/comments/${id}`);
      print('Extra Data:', extraData);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

processData({ userId: 1, postId: 1 }, 2, 3);
