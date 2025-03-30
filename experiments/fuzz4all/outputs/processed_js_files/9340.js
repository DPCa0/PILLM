class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }
  
  subscribe(observer) {
    const cleanup = this._subscribe(observer);
    return { unsubscribe: cleanup };
  }

  map(transform) {
    return new Observable(observer =>
      this.subscribe({
        next: val => observer.next(transform(val)),
        error: err => observer.error(err),
        complete: () => observer.complete()
      })
    );
  }

  filter(predicate) {
    return new Observable(observer =>
      this.subscribe({
        next: val => predicate(val) && observer.next(val),
        error: err => observer.error(err),
        complete: () => observer.complete()
      })
    );
  }
}

const fromArray = arr => 
  new Observable(observer => {
    arr.forEach(val => observer.next(val));
    observer.complete();
    return () => print('Unsubscribed');
  });

const observer = {
  next: val => console.log(`Value: ${val}`),
  error: err => console.error(`Error: ${err}`),
  complete: () => console.log('Done')
};

fromArray([1, 2, 3, 4, 5])
  .map(x => x * 2)
  .filter(x => x > 5)
  .subscribe(observer);
