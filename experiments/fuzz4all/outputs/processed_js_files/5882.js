const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncRange(start, end, step = 1) {
  let current = start;
  while (current <= end) {
    yield current;
    current += step;
    await delay(100);  
  }
}

(async () => {
  try {
    const results = await Promise.allSettled(
      Array.from(asyncRange(1, 5, 1)).map(async num => {
        await delay(num * 100);  
        if (num === 3) throw new Error("An error occurred at 3");
        return num ** 2;
      })
    );

    const resolvedResults = results.filter(({ status }) => status === 'fulfilled').map(({ value }) => value);
    const rejectedResults = results.filter(({ status }) => status === 'rejected').map(({ reason }) => reason.message);

    print('Resolved:', resolvedResults);
    print('Rejected:', rejectedResults);
  } catch (error) {
    console.error('Error:', error);
  }
})();
