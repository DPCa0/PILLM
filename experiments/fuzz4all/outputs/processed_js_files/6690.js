class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe;
    }

    subscribe(observer) {
        const wrapperObserver = {
            next: observer.next || (() => {}),
            error: observer.error || (() => {}),
            complete: observer.complete || (() => {}),
        };
        this._subscribe(wrapperObserver);
    }

    pipe(...operators) {
        return operators.reduce((source, operator) => operator(source), this);
    }
}

const map = (transformFn) => (source) => 
    new Observable((observer) => 
        source.subscribe({
            next: (value) => observer.next(transformFn(value)),
            error: (err) => observer.error(err),
            complete: () => observer.complete()
        })
    );

const filter = (predicateFn) => (source) =>
    new Observable((observer) =>
        source.subscribe({
            next: (value) => predicateFn(value) && observer.next(value),
            error: (err) => observer.error(err),
            complete: () => observer.complete()
        })
    );

 
const numberObservable = new Observable((observer) => {
    [1, 2, 3, 4, 5].forEach(observer.next);
    observer.complete();
});

numberObservable.pipe(
    filter((x) => x % 2 === 0),
    map((x) => x * 10)
).subscribe({
    next: (value) => console.log(value),   
    error: (err) => console.error('Error: ', err),
    complete: () => console.log('Completed')
});
