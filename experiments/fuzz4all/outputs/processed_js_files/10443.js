class AsyncArray extends Array {
  async mapAsync(callback) {
    return Promise.all(this.map(callback));
  }

  async filterAsync(callback) {
    const filterMap = await Promise.all(this.map(callback));
    return this.filter((_, index) => filterMap[index]);
  }
}

const fetchData = async (id) => {
  const data = await fetch(`https: 
  return data.json();
};

const processData = async () => {
  const ids = new AsyncArray(1, 2, 3, 4, 5);

  const posts = await ids.mapAsync(async (id) => {
    const post = await fetchData(id);
    return { id: post.id, title: post.title };
  });

  const filteredPosts = await ids.filterAsync(async (id) => {
    const post = await fetchData(id);
    return post.userId === 1;
  });

  print('Mapped Posts:', posts);
  print('Filtered IDs with userId 1:', filteredPosts);
};

processData().catch(console.error);
