class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }
  
  subscribe(observer) {
    const safeObserver = {
      next: observer.next || (() => {}),
      error: observer.error || ((err) => console.error(err)),
      complete: observer.complete || (() => {}),
    };
    return this._subscribe(safeObserver);
  }
}

const interval = (period) => new Observable((observer) => {
  let count = 0;
  const id = setInterval(() => {
    observer.next(count++);
  }, period);
  
  return () => clearInterval(id);
});

const take = (obs, limit) => new Observable((observer) => {
  let count = 0;
  const subscription = obs.subscribe({
    next: (val) => {
      if (count++ < limit) {
        observer.next(val);
      } else {
        observer.complete();
        subscription();
      }
    },
    error: (err) => observer.error(err),
    complete: () => observer.complete(),
  });
  return subscription;
});

const map = (obs, transformFn) => new Observable((observer) => {
  return obs.subscribe({
    next: (val) => observer.next(transformFn(val)),
    error: (err) => observer.error(err),
    complete: () => observer.complete(),
  });
});

const combinedObs = map(take(interval(1000), 5), x => `Count: ${x}`);

const subscription = combinedObs.subscribe({
  next: (val) => console.log(val),
  complete: () => console.log('Done'),
});

 
setTimeout(subscription, 6000);
