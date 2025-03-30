const asyncIterable = {
  [Symbol.asyncIterator]() {
    let i = 0;
    return {
      next() {
        if (i < 5) {
          return new Promise(resolve => 
            setTimeout(() => resolve({ value: i++, done: false }), 1000)
          );
        }
        return Promise.resolve({ done: true });
      }
    };
  }
};

const fetchData = async () => {
  const data = await Promise.all(
    [1, 2, 3].map(async num => {
      const response = await fetch(`https: 
      return response.json();
    })
  );
  return data;
};

const complexFunction = async () => {
  const iterator = asyncIterable[Symbol.asyncIterator]();
  while (true) {
    const { value, done } = await iterator.next();
    if (done) break;
    print(`Async Iteration: ${value}`);
  }

  const [, secondPost] = await fetchData();
  print(`Title of second post: ${secondPost.title}`);
};

complexFunction().catch(console.error);
