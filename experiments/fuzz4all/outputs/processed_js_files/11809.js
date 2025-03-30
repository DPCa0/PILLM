class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe;
    }

    subscribe(observer) {
        const cleanup = this._subscribe(observer);
        return typeof cleanup === 'function' ? cleanup : () => {};
    }

    map(transform) {
        return new Observable((observer) => {
            return this.subscribe({
                next: (value) => observer.next(transform(value)),
                error: (err) => observer.error(err),
                complete: () => observer.complete(),
            });
        });
    }

    filter(predicate) {
        return new Observable((observer) => {
            return this.subscribe({
                next: (value) => predicate(value) ? observer.next(value) : undefined,
                error: (err) => observer.error(err),
                complete: () => observer.complete(),
            });
        });
    }
}

 
const observable = new Observable((observer) => {
    let count = 0;
    const intervalId = setInterval(() => {
        observer.next(count++);
        if (count > 5) {
            clearInterval(intervalId);
            observer.complete();
        }
    }, 1000);

     
    return () => clearInterval(intervalId);
});

const subscription = observable
    .map(x => x * 2)
    .filter(x => x % 3 === 0)
    .subscribe({
        next: (value) => console.log(`Next: ${value}`),
        error: (err) => console.error(`Error: ${err}`),
        complete: () => console.log('Complete!')
    });

 
setTimeout(() => {
    subscription();
    print('Unsubscribed');
}, 10000);
