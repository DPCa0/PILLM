class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe;
    }

    subscribe(observer) {
        const safeObserver = new Proxy(observer, {
            get(target, prop, receiver) {
                if (typeof target[prop] === 'function') {
                    return target[prop].bind(target);
                } else {
                    throw new Error(`Observer method ${prop} is missing.`);
                }
            }
        });

        return this._subscribe(safeObserver);
    }

    map(transformFn) {
        return new Observable((observer) => {
            return this.subscribe({
                next: (val) => observer.next(transformFn(val)),
                error: (err) => observer.error(err),
                complete: () => observer.complete()
            });
        });
    }

    filter(predicateFn) {
        return new Observable((observer) => {
            return this.subscribe({
                next: (val) => predicateFn(val) ? observer.next(val) : undefined,
                error: (err) => observer.error(err),
                complete: () => observer.complete()
            });
        });
    }
}

 
const observable = new Observable((observer) => {
    const intervalId = setInterval(() => observer.next(Math.random()), 1000);
    setTimeout(() => {
        clearInterval(intervalId);
        observer.complete();
    }, 5000);

    return () => clearInterval(intervalId);  
});

const subscription = observable
    .filter(num => num > 0.5)
    .map(num => num * 100)
    .subscribe({
        next: val => console.log(`Received: ${val}`),
        error: err => console.error(`Error: ${err}`),
        complete: () => console.log('Completed')
    });
