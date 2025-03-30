class AsyncArray {
    constructor(arr) {
        this.arr = arr;
    }

    async mapAsync(callback) {
        const promises = this.arr.map((val, index) => callback(val, index, this.arr));
        return await Promise.all(promises);
    }

    async filterAsync(callback) {
        const filterMap = await Promise.all(this.arr.map((val, index) => callback(val, index, this.arr)));
        return this.arr.filter((_, index) => filterMap[index]);
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async function main() {
    const nums = new AsyncArray([1, 2, 3, 4, 5]);

    const squared = await nums.mapAsync(async (num) => {
        await delay(100);
        return num * num;
    });

    print('Squared:', squared);

    const even = await nums.filterAsync(async (num) => {
        await delay(100);
        return num % 2 === 0;
    });

    print('Even:', even);
})();
