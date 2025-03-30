class EnhancedArray extends Array {
    constructor(...args) {
        super(...args);
    }

     
    static chain(obj) {
        return new Proxy(obj, {
            get(target, prop) {
                if (typeof target[prop] === 'function') {
                    return function (...args) {
                        const result = target[prop].apply(this, args);
                        return result instanceof Array ? EnhancedArray.chain(result) : result;
                    };
                }
                return target[prop];
            }
        });
    }

     
    [Symbol.iterator]() {
        let index = -1;
        const data = this.slice();
        return {
            next: () => ({ value: data[++index], done: index >= data.length })
        };
    }

     
    *flatten() {
        for (const item of this) {
            if (Array.isArray(item)) {
                yield* new EnhancedArray(...item).flatten();
            } else {
                yield item;
            }
        }
    }
}

 
function interpolate(strings, ...values) {
    return strings.raw.reduce((acc, str, idx) => {
        const value = values[idx] !== undefined ? String(values[idx]) : '';
        return `${acc}${str}${value}`;
    }, '');
}

const arr = EnhancedArray.chain(new EnhancedArray([1, [2, 3], 4, [5, [6, 7]]]));
const flattenedArr = [...arr.flatten()];
print(interpolate`Flattened Array: ${flattenedArr}`);  

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print(data);
    } catch (error) {
        console.error(`Fetch error: ${error.message}`);
    }
}

 
 
