class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe;
    }

    subscribe(observer) {
        const safeObserver = new SafeObserver(observer);
        safeObserver._unsubscribe = this._subscribe(safeObserver);
        return { unsubscribe: () => safeObserver.unsubscribe() };
    }
}

class SafeObserver {
    constructor(observer) {
        this._observer = observer;
        this._closed = false;
    }

    next(value) {
        if (!this._closed && this._observer.next) {
            this._observer.next(value);
        }
    }

    error(err) {
        if (!this._closed) {
            this._closed = true;
            if (this._observer.error) {
                this._observer.error(err);
            }
            this.unsubscribe();
        }
    }

    complete() {
        if (!this._closed) {
            this._closed = true;
            if (this._observer.complete) {
                this._observer.complete();
            }
            this.unsubscribe();
        }
    }

    unsubscribe() {
        this._closed = true;
        if (this._unsubscribe) {
            this._unsubscribe();
        }
    }
}

const asyncIterableToObservable = (asyncIterable) => {
    return new Observable((observer) => {
        let cancelled = false;
        (async () => {
            try {
                for await (const item of asyncIterable) {
                    if (cancelled) break;
                    observer.next(item);
                }
                observer.complete();
            } catch (err) {
                observer.error(err);
            }
        })();
        
        return () => cancelled = true;
    });
};

 
async function* asyncGenerator() {
    let i = 0;
    while (i < 3) {
        yield new Promise(resolve => setTimeout(() => resolve(i++), 1000));
    }
}

const observable = asyncIterableToObservable(asyncGenerator());

const subscription = observable.subscribe({
    next: val => console.log(`Next: ${val}`),
    error: err => console.error(`Error: ${err}`),
    complete: () => console.log('Completed')
});

 
 
