class NetworkRequest {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      let response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetch error: ', error);
    }
  }
}

const asyncIterator = {
  [Symbol.asyncIterator]() {
    let step = 0;
    return {
      async next() {
        if (step > 5) return { done: true };
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { value: step++, done: false };
      },
    };
  },
};

async function* fetchAndLog(url) {
  const request = new NetworkRequest(url);
  const data = await request.fetchData();
  yield* Object.entries(data);
}

(async () => {
  try {
    for await (const value of asyncIterator) {
      print(`Step ${value}: ${new Date().toISOString()}`);
    }

    const url = 'https://api.github.com/users/octocat';
    for await (const [key, value] of fetchAndLog(url)) {
      print(`${key}: ${value}`);
    }
  } catch (error) {
    console.error('Error in async execution: ', error);
  }
})();
