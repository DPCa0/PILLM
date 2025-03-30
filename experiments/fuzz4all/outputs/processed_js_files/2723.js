class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observer) {
    const safeObserver = {
      next: (value) => observer.next?.(value),
      error: (err) => observer.error?.(err),
      complete: () => observer.complete?.(),
    };
    return this._subscribe(safeObserver);
  }

  map(transformFn) {
    return new Observable((observer) => {
      return this.subscribe({
        next: (value) => observer.next(transformFn(value)),
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    });
  }

  filter(predicateFn) {
    return new Observable((observer) => {
      return this.subscribe({
        next: (value) => predicateFn(value) && observer.next(value),
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    });
  }
}

const asyncIterable = async function* () {
  for (let i = 0; i < 10; i++) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    yield i;
  }
};

const fromAsyncIterable = (asyncIter) => {
  return new Observable((observer) => {
    (async () => {
      try {
        for await (const value of asyncIter) {
          observer.next(value);
        }
        observer.complete();
      } catch (err) {
        observer.error(err);
      }
    })();
    return { unsubscribe: () => console.log('Unsubscribed') };
  });
};

const obs = fromAsyncIterable(asyncIterable())
  .filter((x) => x % 2 === 0)
  .map((x) => x * x);

obs.subscribe({
  next: (value) => console.log('Received:', value),
  complete: () => console.log('Done!'),
});
