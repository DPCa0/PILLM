class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe;
    }

    subscribe(observer) {
        return this._subscribe(observer);
    }

    pipe(...operators) {
        return operators.reduce((prev, op) => op(prev), this);
    }
}

const map = (fn) => (observable) =>
    new Observable((observer) =>
        observable.subscribe({
            next: (val) => observer.next(fn(val)),
            error: (err) => observer.error(err),
            complete: () => observer.complete(),
        })
    );

const filter = (predicate) => (observable) =>
    new Observable((observer) =>
        observable.subscribe({
            next: (val) => predicate(val) && observer.next(val),
            error: (err) => observer.error(err),
            complete: () => observer.complete(),
        })
    );

const fromArray = (array) =>
    new Observable((observer) => {
        array.forEach((val) => observer.next(val));
        observer.complete();
        return { unsubscribe() {} };
    });

const toObserver = (label) => ({
    next: (val) => console.log(`${label}: ${val}`),
    error: (err) => console.error(`Error: ${err}`),
    complete: () => console.log(`${label}: Complete`),
});

const numbers = fromArray([1, 2, 3, 4, 5]);

numbers
    .pipe(
        filter((x) => x % 2 === 0),
        map((x) => x * x)
    )
    .subscribe(toObserver('Observer 1'));

numbers
    .pipe(
        map((x) => x + 10),
        filter((x) => x > 12)
    )
    .subscribe(toObserver('Observer 2'));
