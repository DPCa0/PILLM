class AsyncUtilities {
  static async *fetchWithTimeout(url, timeout) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(id);
      yield await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        yield { error: 'Request timed out' };
      } else {
        yield { error: 'Fetch error' };
      }
    }
  }

  static async execute() {
    const urls = [
      'https://api.agify.io/?name=michael',
      'https://api.agify.io/?name=sarah',
      'https://api.agify.io/?name=steve'
    ];

    const fetchPromises = urls.map(url => AsyncUtilities.fetchWithTimeout(url, 3000));
    for await (const response of AsyncUtilities.concurrentLimit(fetchPromises, 2)) {
      print(response);
    }
  }

  static async *concurrentLimit(iterable, limit) {
    const iterator = iterable[Symbol.iterator]();
    const promises = [];
    let count = 0;
    let done = false;

    while (!done || promises.length) {
      while (!done && count < limit) {
        const { value, done: iterationDone } = iterator.next();
        done = iterationDone;
        if (!done) {
          count++;
          promises.push((async () => (await value.next()).value)());
        }
      }
      if (promises.length) {
        const resolvedPromise = await Promise.race(promises);
        yield resolvedPromise;
        promises.splice(promises.indexOf(resolvedPromise), 1);
        count--;
      }
    }
  }
}

AsyncUtilities.execute();
