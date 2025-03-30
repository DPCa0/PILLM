class ComplexFeatureDemo {
  constructor(name) {
    this.name = name;
    this.data = new Map();
  }

  async fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    this.data.set('posts', await response.json());
  }

  *filterPostsByUserId(userId) {
    for (const post of this.data.get('posts')) {
      if (post.userId === userId) {
        yield post;
      }
    }
  }

  async run(userId) {
    try {
      await this.fetchData();
      print(`Data fetched for ${this.name}`);
      
      const generator = this.filterPostsByUserId(userId);
      for (const post of generator) {
        print(`Post ${post.id} by user ${userId}: ${post.title}`);
      }

      const add = (a, b) => a + b;
      const curriedAdd = a => b => add(a, b);
      print(`Curried sum of 5 and 3 is ${curriedAdd(5)(3)}`);

    } catch (error) {
      console.error('Error:', error);
    }
  }
}

const demo = new ComplexFeatureDemo('Advanced JS Features');
demo.run(1);
