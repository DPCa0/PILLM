 
(async () => {
   
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();

   
  const [{ title: firstTitle, body: firstBody }] = posts;
  print(`First Post: ${firstTitle}\n${firstBody}`);

   
  const wordCounts = posts
    .filter(post => post.body.length > 100)  
    .map(post => post.body.split(' ').length)  
    .reduce((sum, count) => sum + count, 0);  

  print(`Total word count for long posts: ${wordCounts}`);

   
  const handler = {
    get: (obj, prop) => {
      print(`Property "${prop}" has been accessed`);
      return prop in obj ? obj[prop] : 'Property not found';
    }
  };

  const proxiedPost = new Proxy(posts[0], handler);
  print(proxiedPost.title);  

   
  const uniqueWords = new Set(posts.flatMap(post => post.body.split(' ')));
  print(`Unique words count across all posts: ${uniqueWords.size}`);

   
  class Post {
    constructor(title, body) {
      this.title = title;
      this.body = body;
    }

    summary() {
      return `${this.title}: ${this.body.substring(0, 20)}...`;
    }
  }

  class FeaturedPost extends Post {
    constructor(title, body, featuredDate) {
      super(title, body);
      this.featuredDate = featuredDate;
    }

    featuredSummary() {
      return `${this.summary()} Featured on: ${this.featuredDate}`;
    }
  }

  const featured = new FeaturedPost(firstTitle, firstBody, new Date().toISOString());
  print(featured.featuredSummary());

   
  print(posts[999]?.title ?? 'Post not found');
})();
