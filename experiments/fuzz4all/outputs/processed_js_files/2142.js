class Observable {
  constructor(subscribe) {
    this.subscribe = subscribe;
  }

  pipe(...operations) {
    return operations.reduce((source, fn) => fn(source), this);
  }
}

const filter = predicate => observable =>
  new Observable(observer =>
    observable.subscribe({
      next: x => (predicate(x) ? observer.next(x) : null),
      error: err => observer.error(err),
      complete: () => observer.complete()
    })
  );

const map = transform => observable =>
  new Observable(observer =>
    observable.subscribe({
      next: x => observer.next(transform(x)),
      error: err => observer.error(err),
      complete: () => observer.complete()
    })
  );

const fromArray = arr =>
  new Observable(observer => {
    arr.forEach(val => observer.next(val));
    observer.complete();
  });

const numbers = fromArray([1, 2, 3, 4, 5]);

numbers
  .pipe(
    filter(x => x % 2 === 0),
    map(x => x * x)
  )
  .subscribe({
    next: x => console.log(x),
    error: err => console.error('Error:', err),
    complete: () => console.log('Complete')
  });
