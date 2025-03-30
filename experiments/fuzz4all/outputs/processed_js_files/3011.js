 
class AdvancedFeatures {
    constructor() {
        this.data = ['apple', 'banana', 'cherry'];
    }

     
    getArrayProxy() {
        return new Proxy(this.data, {
            get: (target, property) => {
                if (property === 'first') {
                    return target[0];
                } else if (property === 'last') {
                    return target[target.length - 1];
                }
                return target[property];
            },
            set: (target, property, value) => {
                print(`Setting ${property} to ${value}`);
                target[property] = value;
                return true;
            }
        });
    }

     
    async *streamData() {
        for (const item of this.data) {
            await new Promise(resolve => setTimeout(resolve, 1000));  
            yield item.toUpperCase();
        }
    }

     
    static format(strings, ...values) {
        return strings.reduce((prev, curr, i) => `${prev}${curr}<${values[i] || ''}>`, '');
    }
}

 
const features = new AdvancedFeatures();
const proxy = features.getArrayProxy();

print(`First: ${proxy.first}`);
proxy[1] = 'blueberry';
print(`Modified Array: ${proxy}`);

 
(async () => {
    for await (const item of features.streamData()) {
        print(`Streamed Item: ${item}`);
    }
})();

 
const formattedOutput = AdvancedFeatures.format`Items: ${proxy[0]}, ${proxy[1]}, ${proxy[2]}`;
print(`Formatted Output: ${formattedOutput}`);
